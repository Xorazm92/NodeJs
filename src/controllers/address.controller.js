import { logger } from "../utils/logger.js";
import { creatAddressService, getAddressByIdService, getAllAddressService, updateAddressService } from "../service/index.js";
import { error } from "winston";


export const getAllAddress = async (req,res,next) =>
 {
    try {
        const allAddress = await getAllAddressService()
        res.status(200).send({message: "Successfull", data: allAddress})
    } catch (error) {
        logger.error(error)
        next(error)
        
    }
    
}
export const getAddressById = async (req,res,next) => {
    try {
        const oneAddress = await getAddressByIdService(req.params.id)
        res.status(200).send({message: "Successfull", data: oneAddress})
    } catch (error) {
        logger.error(error)
        next(error)
    
    }    
}

export const createAddress = async (req,res,next) => {
    try {
        const message = await creatAddressService(req.body)
        if(message.status === 'CREATED'){
            return res
                .status(200)
                .send({status: 'CREATED'})
        }
        throw new Error(message.error);
        
    } catch (error) {
        logger.error(error)
        next(error)
    }
    
}

export const updateAddress = async (req,res, next) => {
    try {
        const message = await updateAddressService(req.params.id, req.body)
        if(message.status === 'NOTFOUND'){
            return res.status(404).send({message: 'NOT FOUNDED'})
        }
        if (message.status === 'OK'){
            return res.status(200).send({message: 'SUCCESSFULL', id:req.params.id})
        }
        throw new Error(message.error);
        
    } catch (error) {
         logger.error(error)
         next(error)
        
    }
    
}

export const deleteAddress = async (req,res, next) => {
    try {
        const message = await deleteAddressService(req.params.id)
        if(message.status === 'NOTFOUND'){
            return res
            .status(404)
            .send({ msg: 'malumot topilmadi' })
    }
    if (message.status === 'OK') {
        return res
            .status(200)
            .send({ status: 'Success', id: req.params.id })
    }
    throw new Error(message.error)
} catch (error) {
    logger.error(error)

    next(error)
}
}