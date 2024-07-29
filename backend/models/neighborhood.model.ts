import { Schema, Types, model } from "mongoose";
import slugify from "slugify";
import { INeighborhood } from "../interfaces/neighborhood/neighborhood.interface";

const neighborhoodSchema = new Schema<INeighborhood>(
    {
        name_en: { type: String, required: true },
        name_ar: { type: String, required: true },
        slug: { type: String },
        city: {
            type: Types.ObjectId,
            ref: "City",
            required: [true, "neighborhood Must Be Belong To Parent City"],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

neighborhoodSchema.pre('save', function (next) {
    this.slug = slugify(this.name_en)
    next()
})

neighborhoodSchema.pre('findOneAndUpdate', async function (next) {
    const doc = this.getUpdate() as any
    doc.slug = slugify(doc.name_en)
    next()
})


export const Neighborhood = model<INeighborhood>("Neighborhood", neighborhoodSchema);
