const xlsx = require("node-xlsx");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const readLocationXlsx = xlsx.parse("ThepExcel-Thailand-Tambon.xlsx");
const locationDetail = readLocationXlsx[1].data;
const districts = locationDetail.slice(1, locationDetail.length).map((data) => {
  return {
    districtId: data[8],
    thaiName: data[8].toString().slice(0, 2) === "10" ? data[9] : data[11],
    engName: data[8].toString().slice(0, 2) === "10" ? data[10] : data[12],
    provinceId: data[13],
  };
});
const filterDistrict = [...new Set(districts.map(JSON.stringify))].map(
  JSON.parse
);

const districtJson = filterDistrict.map((data) => {
  return {
    _id: { $oid: new ObjectId() },
    ...data,
  };
});

fs.writeFileSync("json/district.json", JSON.stringify(districtJson));
