module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    stt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true   // ❗ bắt buộc không trùng
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hometown: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Patient;
};
