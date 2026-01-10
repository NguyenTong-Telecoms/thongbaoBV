const { Patient } = require('../models');
const ExcelJS = require('exceljs');

exports.listPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
    res.render('admin', { patients, error: null });
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi tải danh sách bệnh nhân');
  }
};

exports.createPatient = async (req, res) => {
  try {
    const { stt, name, birth, address, status } = req.body;

    const exist = await Patient.findOne({ where: { stt } });
    if (exist) {
      const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
      return res.render('admin', { patients, error: '❌ SỐ THỨ TỰ ĐÃ TỒN TẠI' });
    }

    await Patient.create({
      stt: stt,
      fullName: name,
      birthDate: birth,
      hometown: address,
      status: status
    });

    res.redirect('/patients');
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi thêm bệnh nhân');
  }
};

// Cập nhật bệnh nhân
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { stt, name, birth, address, status } = req.body;

    const exist = await Patient.findOne({ where: { stt, id: { $ne: id } } });
    if (exist) {
      const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
      return res.render('admin', { patients, error: '❌ SỐ THỨ TỰ ĐÃ TỒN TẠI' });
    }

    await Patient.update(
      {
        stt,
        fullName: name,
        birthDate: birth,
        hometown: address,
        status
      },
      { where: { id } }
    );

    res.redirect('/patients');
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi sửa bệnh nhân');
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await Patient.destroy({ where: { id: req.params.id } });
    res.redirect('/patients');
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi xoá bệnh nhân');
  }
};

exports.showList = async (req, res) => {
  const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
  res.render('list', { patients });
};

exports.getPatientsJson = async (req, res) => {
  const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
  res.json(patients);
};

exports.exportExcel = async (req, res) => {
  const patients = await Patient.findAll({ order: [['stt', 'ASC']] });
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Patients');

  sheet.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'Họ tên', key: 'fullName', width: 30 },
    { header: 'Ngày sinh', key: 'birthDate', width: 15 },
    { header: 'Quê quán', key: 'hometown', width: 20 },
    { header: 'Trạng thái', key: 'status', width: 15 }
  ];

  patients.forEach(p => sheet.addRow(p.dataValues));

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=patients.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
