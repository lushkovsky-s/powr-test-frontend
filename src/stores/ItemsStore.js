import { observable, action, computed } from 'mobx'

import colors from '../colors'

class ItemsStore {
    @observable idForItem = 2
    @observable items = [
        {
            id: 1,
            type: 'container',
            parentId: null
        }
    ]

    @action addItem = (parentId, type) => {
        this.items = [
            ...this.items,
            {
                id: this.idForItem,
                type,
                parentId,
                ...(type === 'box' ? { optional: {color: 'orange'} } : {})
            }
        ]

        this.idForItem++;
    }

    @action nextColor = (boxItemId) => {
        const idx = this.items.findIndex((item) => item.id === boxItemId)

        if (this.items[idx].type !== 'box') {
            throw new Error(`This action could be applied only to box items. But called for item with id ${boxItemId} (type: ${this.items[idx].type})`)
        }

        const variants = colors.filter((c) => c !== this.items[idx].optional.color)
        const random = variants[Math.floor((Math.random()*variants.length))]

        this.items[idx].optional.color = random
    }

    @action deleteItem = (itemId) => {
        const idx = this.items.findIndex((item) => item.id === itemId)
        console.log(idx, this.items)
        this.items.splice(idx, 1)
    } 
    
    @action loadFromJson = (jsonStr) =>  {
        const json = JSON.parse(jsonStr)

        function recursive(root, parentId=null, id=1) {
            let result = []

            result.push({
                id,
                type: 'container',
                parentId: parentId
            })

            let nextId = id + 1

            for (let i in root.items) {
                if (root.items[i].type === 'container') {
                    if (root.items[i].items) {
                        result = [...result, ...recursive(root.items[i], id, nextId)]
                    } else {
                        result.push({
                            id: nextId,
                            type: 'container',
                            parentId: id,
                            items: []
                        })
                        nextId++
                    } 
                } else if (root.items[i].type === 'box') {
                    result.push({
                        type: 'box',
                        id: nextId,
                        parentId: id,
                        optional: {
                            color: root.items[i].color
                        }
                    })
                    nextId++
                }
            }

            return result
        }

        let loaded = recursive(json)
        this.items = loaded
        this.idForItem = loaded.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0) + 1
    }

    @computed get asJson() {
        let json = {
            id: 1,
            type: 'container',
            items: []
        }

        function findObjectById(root, id) {
            if (root.id === id) {
                return root
            } else if (root.items) {
                for (var k in root.items) {
                    if (root.items[k].id === id) {
                        return root.items[k];
                    }
                    else if (root.items.length) {
                        const deepCheckResult = findObjectById(root.items[k], id)
                        
                        if (deepCheckResult) {
                            return deepCheckResult
                        }
                    }
                }
            }
        }

        for (let id = 2; id < this.idForItem; ++id) {
            const item = this.items.find((item) => item.id === id)

            if (!item) { // Skip for the deleted item case 
                continue 
            }

            let obj = findObjectById(json, item.parentId)

            obj.items.push({
                id: item.id,
                type: item.type,
                ...(item.type === 'box' ? {color: item.optional.color} : {}),
                ...(item.type === 'container' ? {items: []} : {})
            })
        }

        for (let id = 1; id < this.idForItem; ++id) {
            let obj = findObjectById(json, id)
            if (!obj) { // Skip for deleted item case
                continue
            }
            delete obj['id']
        }

        return JSON.stringify(json)
    }
}

const store = new ItemsStore()
export default store