const Sequelize = require('sequelize');
const db = require('../utils/database');

const Task = db.define('Task', {
    judul: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: Sequelize.TEXT,
    },
    selesai: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    dihapus: {
      type: Sequelize.DATE,
    },
  }, {
    hooks: {
      beforeDestroy: (instance, options) => {
        return Task.update(
          { 
            dihapus: new Date()
          },
          { 
            where: { id: instance.id },
            individualHooks: true 
          }
        );
      }
    }
  });

module.exports = Task;
