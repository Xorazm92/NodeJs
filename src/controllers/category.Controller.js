export const addCategory = async (req, res, next) => {
    try {
        const{error,value} = categoryValidation(req.body);
        if(error) return res.status(400).send({message:error.message});
        const {category_name, parent_category_id} = value;

        const category = await Category.findOne({category_name:{$regex:category_name, $option: "i"}})    // regex bu yerda katta kichikni axamiyatini yo'qotib beradi

        if(category) return res.status(400). send({message:"Category alerady exsisit"})  // categoriyani bor yo'qini tekshirish

        const newCategory = await Category.create({category_name, parent_category_id}) // yangi categoriya qo'shiladi

        res.status(201).send({message: "Category create Saccessful", newCategory}); // 
    } catch (error) {
            next(new ApiError(error.statusCode, error.message));

        
    }
    
}

export const getCategory = async (req,res,next) => {
    try {
        res.send(await Category.find()); // hamma categoryni qidirish
        
    } catch (error) {
        next(error)
        
    }
    
}

export const updateCategoryById = async (req,res,next) => {
    try {

            const{error,value} = categoryValidation(req.body);
            if(error) return res.status(400).send({message:error.message});

            const{id} = req.params;

            const{category_name} = value;

            console.log(category_name);
            
            const updateCategoryById = await Category.findByIdAndUpdate(id, {category_name}, {new:true});
            
            res.status(200).send({message: "Category update Saccessful",date: updateCategory,});  
        } catch (error) {
                next(error);
            
        }
        
    }

export const deleteCategoryById =async (req,res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);
  
        res.send({
  
          message: "Category deleted successfully",
  
          data: deletedCategory,
  
        });       
    } catch (error) {
        next(error)
        
    }
    
}