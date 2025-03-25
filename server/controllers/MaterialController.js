const { Material } = require('../models/index');
class MaterialController {
    static async index(req, res, next) {
        {
            try {
                // find materials by course id
                const materials = await Material.findAll({
                    where: {
                        CourseId: req.params.courseId
                    }
                });

                res.status(200).json({
                    message: "materials retrieved successfully",
                    data: materials
                });

            } catch (error) {
                next(error);
            }
        }
    }
}

module.exports = MaterialController;