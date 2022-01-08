const db = require('../startup/db');
const { validateAddPortfolio } = require('../validation/portfolioValidate')

exports.addportfolio = async (req, res) => {


    try {
        const { error } = validateAddPortfolio(req.body);
        console.log(error);
        if (error) {

            if (error.details[0].context.key == 'porject_name') {

                var err2 = error.details[0].message;
                return res.status(400).send(err2)
            }
            if (error.details[0].context.key == 'porject_title') {

                var err4 = error.details[0].message;
                return res.status(400).send(err4)
            }
            if (error.details[0].context.key == 'porject_date') {

                var err5 = error.details[0].message;
                return res.status(400).send(err5)
            }
            if (error.details[0].context.key == 'description') {

                var err6 = error.details[0].message;
                return res.status(400).send(err6)
            }
        }

        const category = req.body.project_category;
        db.query(`SELECT * FROM category WHERE category_name = ?`, [category], (err, result) => {

            if (result) {
                const multipleimg = req.files.map((multipleimg) => multipleimg.filename)
                const project_category = result[0].id;
                const { porject_name, porject_title, porject_date, description } = req.body
                const profile = multipleimg;
                db.query('INSERT INTO portfolio SET ?', {
                    project_category: project_category,
                    porject_name: porject_name,
                    porject_title: porject_title,
                    porject_date: porject_date,
                    description: description,
                    profile: profile
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Portfolio Will Be Add')
                    }
                })

            }
            else {
                res.status(400).send('Category Not Found');
            }
        })

    } catch (error) {
        console.log(error);
    }

}
exports.data = async (req, res) => {
    db.query('SELECT portfolio.id,category.category_name,porject_name,porject_title,porject_date,description,profile FROM portfolio INNER JOIN category ON category.id = portfolio.project_category', async (err, result) => {

        if (result) {
            res.send(result)
        }
        else {
            res.status(400).send('data not found')
        }
    });

};
exports.updatePortfolio = async (req, res) => {
    try {

        let id = req.params.id;
        const category = req.body.project_category;
        db.query(`SELECT * FROM category WHERE category_name = ?`, [category], (err, result) => {

            if (result) {
                const multipleimg = req.files.map((multipleimg) => multipleimg.filename)
                const project_category = result[0].id;
                const { porject_name, porject_title, porject_date, description } = req.body
                const profile = multipleimg;
                db.query('UPDATE portfolio SET ?', {
                    project_category: project_category,
                    porject_name: porject_name,
                    porject_title: porject_title,
                    porject_date: porject_date,
                    description: description,
                    profile: profile
                }, (err, addResult) => {
                    if (addResult) {
                        res.send('Portfolio Will Be update')
                    }
                })

            }
        })
    } catch (error) {
        console.error(error);
    }

}
exports.deletePortfolio = async (req, res) => {
    try {
        let id = req.params.id;
        db.query('DELETE FROM portfolio WHERE id=?', [id], async (err, result) => {
            if (result) {
                res.send('Portfolio Delete Successfuly')
            }
            else {
                res.status(400).send('data not found')
            }
        })

    } catch (error) {
        console.error(error);
    }
}