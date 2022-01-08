const db = require('../startup/db');
const { validateAddCategory } = require('../validation/categoryValidate')
exports.addCategory = async (req, res) => {
    try {
        const { error } = validateAddCategory(req.body);

        if (error) {
            if (error.details[0].context.key == 'category_name') {
                var err1 = error.details[0].message;
                return res.status(400).send(err1)
            }
        }
        const { category_name } = req.body
        db.query('SELECT * FROM category WHERE category_name=?', [category_name], (err, result) => {

            if (result.length > 0) {
                return res.status(400).send('Category already add')

            }
            else {
                db.query('INSERT INTO category SET ?', {
                    category_name: category_name
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Category Will Be Add')
                    }
                })
            }

        })
    }
    catch (error) {
        console.error(error);
    }

}
exports.data = async (req, res) => {
    db.query('SELECT * FROM category ', async (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};
exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const { category_name } = req.body;
        db.query(`UPDATE category SET category_name='${category_name}' WHERE id=?`, [id], async (err, result) => {
            console.log(result);
            if (result) {
                res.send('Category Will Be Update')
            }
            else {
                res.status(400).send('data not found')
            }
        })
    } catch (error) {
        console.error(error);
    }

}

exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        db.query('DELETE FROM category WHERE id=?', [id], async (err, result) => {
            if (result) {
                res.send('Category Delete Successfuly')
            }
            else {
                res.status(400).send('data not found')
            }
        })

    } catch (error) {
        console.error(error);
    }
}
