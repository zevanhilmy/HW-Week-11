const Sequelize = require('sequelize');
const Task = require('../models/task');

// CRUD Controllers

//lihat semua task
exports.AllTask = (req, res, next) => {
    Task.findAll({
      where: { 
        dihapus: null 
      },
      attributes: ['id','judul']
    })
        .then(tasks => {
            res.status(200).json({ tasks: tasks });
        })
        .catch(err => console.log(err));
}

//lihat Task by id
exports.detailTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.findByPk(taskId)
        .then(task => {
            if (!task) {
                return res.status(404).json({ message: 'Task tidak ditemukan!' });
            }
            res.status(200).json({ task: task });
        })
        .catch(err => console.log(err));
}

//melihat task yang sudah di softdelete
exports.allDelete = (req, res) => {
    Task.findAll({
      where: {
        dihapus: { 
          [Sequelize.Op.not]: null
        }
      }
    })
      .then(task => {
        res.status(200).json({ task: task });
      })
      .catch(err => console.log(err));
}


//buat task baru
exports.addTask = (req, res) => {
    const judul = req.body.judul;
    const deskripsi = req.body.deskripsi;
    Task.create({
      judul: judul,
      deskripsi: deskripsi
    })
      .then(result => {
        console.log('Created Todo');
        res.status(201).json({
          message: 'Todo created successfully!',
          task: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

exports.softDelete = (req, res) => {
  const taskId = req.params.taskId;
  Task.findByPk(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task tidak ditemukan!' });
      }
      task.dihapus = new Date();
      return task.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Task dihapus (soft delete)!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    });
}