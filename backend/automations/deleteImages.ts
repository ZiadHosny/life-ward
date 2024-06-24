import crone from 'node-cron'
import path from 'path'
import {Product} from '../models/product.model'
import {Section} from '../models/section.model'
import fs from 'fs'

// LETS DIVIDE THE CODE TO FUNCTIONS 
const getAllTheImages = async () => {
    let images: string[] = []
    let products = (await Product.find({})).map(product => product.images)
    let sections = (await Section.find({ $ne: { image: '' } })).map(section => section.image)
    // fltenout the nested array
    products.map(product => {
        images = [...images, ...product]

    })
    if (sections[0]) {
        images = [...images, ...sections]
    }
    return images
}
const convertArrayToObject = (images: string[]) => {

    let imagesObj: any = {}
    images.forEach(image => {
        if (!imagesObj[image]) {
            imagesObj[image] = true
        }
    })
    return imagesObj;
}
const delteImageFromUpload = (imagePath: string) => {
    const exist = fs.existsSync(imagePath)
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
    }
}
const deleteUnUsedImages = (images: string[]) => {
    const uploadsPath = path.join(__dirname, '..', '..', 'uploads')
    const assets = fs.readdirSync(uploadsPath)
    let imagesObject = convertArrayToObject(images)
    // convert the usedImages to object
    assets.forEach((asset: string) => {
        let assetPath = `${uploadsPath}/${asset}`;
        if (!imagesObject[asset]) {
            // its time for image to get Delted
            delteImageFromUpload(assetPath)
        }
    })


}
export const deleteImages = () => {
    const start = new Date()
    crone.schedule('* * */24 * * *', (async () => {




        let images: string[] = await getAllTheImages()

        deleteUnUsedImages(images)




        // lets get all the uploads 
        // the main event for deleting the assets if it not exist in the upload

    }))
}
