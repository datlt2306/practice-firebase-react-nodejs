import Category from '../models/category';
import slugify from 'slugify';
export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        // console.log('err', err);
        res.status(400).json({
            error: "Create category failed"
        })
    }
}
export const read = async (req, res) => {
    const category = await Category.find({ slug: req.params.slug }).exec();
    res.json(category)
}
export const update = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true });
        res.json(category);
    } catch (error) {
    }
}
export const remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Create deleted failed")
    }
}
export const list = async (req, res) => {
    const categories = await Category.find({}).sort({ createAt: -1 }).exec();
    res.json(categories);
}