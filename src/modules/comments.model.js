const {Schema, model} = require ("mongoose");

const commentSchema = new Schema(
    {
       comment_id:{
        type: Schema.Types.ObjectId,
        ref:"Comment",
        default: null
       },
       content_title: {
        type: String,
        required: true,
        trim: true,
        unique: true
        },
        article_id: {
            type: Schema.Types.ObjectId,
            ref: "Topic",
            default: null
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null
        },
        created_date: {
            type: Date,
            default: Date.now,
        },
        course_id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null
        },
    }
)

module.exports = model("Comment", commentSchema);