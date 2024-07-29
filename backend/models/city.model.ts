import { Schema, model } from "mongoose";
import { ICity } from "../interfaces/city/city.interface";
import slugify from "slugify";

const citySchema = new Schema<ICity>(
    {
        name_en: { type: String, required: true },
        name_ar: { type: String, required: true },
        slug: { type: String },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        default: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

citySchema.pre('save', function (next) {
    this.slug = slugify(this.name_en)
    next()
})

citySchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any

    if (doc.name_en)
        doc.slug = slugify(doc.name_en)
    next()
})


export const City = model<ICity>("City", citySchema);
