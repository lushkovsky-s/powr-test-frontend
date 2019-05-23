import React from 'react'

export default class Box extends React.Component {
    render() {
        const {
            color,
            onBoxClick,
            onDeleteClick,
        } = this.props

        const styles = {
            box: {
                display: 'inline-block',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: color,
                backgroundColor: color,
                width: '50px',
                height: '50px',
                position: 'relative'
            },
            deleteBtn: {
                color: 'white',
                position: 'absolute',
                top: '2px',
                right: '5px',
                cursor: 'pointer'
            }
        }

        return (
            <div style={styles.box} onClick={onBoxClick}>
                <div 
                    style={styles.deleteBtn} 
                    onClick={(e) => {
                        e.stopPropagation() // Otherwise then button will be clicked - onClick callback of the box will be fired too and will cause color change on deleted element (and error)
                        onDeleteClick()
                    }}
                >✖</div> 
            </div>
        )
    }
}