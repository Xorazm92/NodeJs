import pool from "../databases/index.js";
import { createUser } from "./user.service.js";

export const getAllAddressService = async () => {
    try {
        const allData = await pool.query('SELECT * FROM address')
        return allData.rows[0]
    } catch (error) {
        return error

    }

}

export const getAddressByIdService = async () => {
    try {
        const allData = await pool.query(
            'SELECT *FROM address where id = $1', [id]
        )
        return allData.rows[0]
    } catch (error) {
        return error
        
    }
    
}

export const creatAddressService = async (data) => {
    try {
        const{
            user_id,
            title,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
            field_12
        } = data
        const newData = await pool.query(
            `
            INSERT INTO address (user_id, title, 
            address_line_1, address_line_2, country, city, postal_code, phone_number, landmark, field_12) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
            `,
            [
                user_id,
                title,
                address_line_1,
                address_line_2,
                country,
                city,
                postal_code,
                phone_number,
                landmark,
                field_12
            ]
        )
        return {status: 'CREATED'}
    } catch (error) {
        return error
        
    }
    
}

export const updateAddressService = async (id, data) => {
    try {
        const currentAddress = await pool.query('SELECT * FROM adress WHERE id =$1', [id])
        if (currentUser.rowCount === 0){
            return {status:'NOTFOUND'}
        }
        const {
            user_id,
            title,
            address_line_1,
            address_line_2,
            country,
            city,
            postal_code,
            phone_number,
            landmark,
            field_12,
        } = data
        const updateUserr = await pool.query(
            `UPDATE addresses SET user_id = $1, title = $2, address_line_1 = $3, address_line_2 = $4, country = $5, city = $6, postal_code = $7, phone_number = $8, landmark = $9, field_12 = $10`,
            [
                user_id || curentAddresses.rows[0].user_id,
                title || curentAddresses.rows[0].title,
                address_line_1 || curentAddresses.rows[0].address_line_1,
                address_line_2 || curentAddresses.rows[0].address_line_2,
                country || curentAddresses.rows[0].country,
                city || curentAddresses.rows[0].city,
                postal_code || curentAddresses.rows[0].postal_code,
                phone_number || curentAddresses.rows[0].phone_number,
                landmark || curentAddresses.rows[0].landmark,
                field_12 || curentAddresses.rows[0].field_12,
            ]
        )
        return { status: 'OK' }
    } catch (error) {
        return error
    }
}

export const deleteAddressService = async (id) => {
    try {
        const curentAddresses = await pool.query('SELECT * FROM adress WHERE id =$1', [id])
        if(curentAddresses.rowCount === 0){
            return {status:'NOTFOUND'}

        }
        const deleteAddress = await pool.query(
            'DELETE FROM address WHERE id=$1',[id] 
        )
        return {status: "OK"}
    } catch (error) {
        return error
        
    }
    
}