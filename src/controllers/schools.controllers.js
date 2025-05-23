const mysqlPool = require("../config/db");
const { getDistance } = require("../utils");

//add school handler
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const [result] = await mysqlPool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    res
      .status(201)
      .json({ message: "School added", schoolId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// list school handler
const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  try {
    const [schools] = await mysqlPool.query("SELECT * FROM schools");
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: getDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance); //sorts numbers in ascending order

    res.json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSchool,
  listSchools,
};
