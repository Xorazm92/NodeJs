import fs from 'fs'

export const readProductsDb = (url) => {
    const data = fs.readFileSync(url, 'utf-8')

    if(data) {
        const phones = JSON.parse(data)
        return phones
    }else{
        return []
    }
}


export const writeProductsDb = (url, data) => {
    fs.writeFileSync(url, JSON.stringify(data))
}