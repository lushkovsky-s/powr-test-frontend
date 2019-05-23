import React from 'react'
import { inject, observer } from 'mobx-react'

import Box from './Box'

@inject('ItemsStore')   
@observer
class Container extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mouseOverAddBtn: false
        }

        this.onAddBoxClick = this.onAddBoxClick.bind(this)
        this.onAddContainerClick = this.onAddContainerClick.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onMouseOverAdd = this.onMouseOverAdd.bind(this)
        this.onMouseLeaveAdd = this.onMouseLeaveAdd.bind(this)
    }
    onMouseOverAdd() {
        this.setState({ mouseOverAddBtn: true })
    }
    onMouseLeaveAdd() {
        this.setState({ mouseOverAddBtn: false })
    }
    onAddContainerClick() {
        this.props.ItemsStore.addItem(this.props.containerStoreId, 'container')
    }
    onAddBoxClick() {
        this.props.ItemsStore.addItem(this.props.containerStoreId, 'box')
    }
    onDeleteClick() {
        const ItemsStore = this.props.ItemsStore
        ItemsStore.deleteItem(this.props.containerStoreId)
    }
    render() {
        const {
            ItemsStore,
            containerStoreId 
        } = this.props

        const childItems = ItemsStore.items.filter((item) => item.parentId === containerStoreId)

        const styles = {
            container: {
                display: 'inline-block',
                verticalAlign: 'top',
                border: '1px solid black',
                margin: '0 20px'
            },
            buttonsArea: {
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top'
            },
            addSubbuttons: {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '200px' // Otherwise the subbuttons will be shown line by line event in case of inline-block
            },
            addSubBtn: {
                display: 'inline-block',
                margin: '0 2px',
                zIndex: 10000
            },
            addBtn: {
                padding: '10px 20px',
                margin: '5px 5px'
            },
            deleteBtn: {
                color: 'black',
                display: 'inline-block',
                cursor: 'pointer',
                margin: '0 3px'
            }
        }
        
        return (
            <div style={styles.container} onMouseLeave={this.onMouseLeaveAdd}>
                { 
                    childItems.map(({ id, type, optional }, idx) =>  {
                        if (type === 'box') {
                            return <Box 
                                color={optional.color} 
                                onBoxClick={() => ItemsStore.nextColor(id)}    
                                onDeleteClick={(e) => ItemsStore.deleteItem(id)}
                                key={idx}
                            />
                        } else if (type === 'container') {
                            return <Container 
                                containerStoreId={id} 
                                ItemsStore={ItemsStore} 
                                key={idx} 
                            />
                        } else {
                            throw new Error(`Unexpected child type: ${type}`)
                        }
                    }) 
                }
                <div style={styles.buttonsArea}>
                    <button
                        style={styles.addBtn} 
                        onMouseOver={this.onMouseOverAdd} 
                    >Add</button>
                    { this.state.mouseOverAddBtn &&
                        <div style={styles.addSubbuttons}>
                            <button 
                                style={styles.addSubBtn} 
                                onClick={this.onAddBoxClick}
                            >Box</button>
                            <button
                                style={styles.addSubBtn} 
                                onClick={this.onAddContainerClick}
                            >Container</button>
                        </div>
                    }
                    <div 
                        style={styles.deleteBtn}
                        onClick={this.onDeleteClick}
                    >✖</div> 
                </div>
            </div>
        )
    }
}

export default Container