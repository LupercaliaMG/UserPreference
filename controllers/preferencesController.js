
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/preferences.json');

const readPreferencesFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writePreferencesFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.getPreferences = (req, res) => {
    const { steamId } = req.params;
    const preferencesData = readPreferencesFile();

    if (preferencesData[steamId]) {
        res.status(200).json(preferencesData[steamId]);
    } else {
        res.status(404).json({});
    }
};

// 특정 Steam ID의 사용자 선호도 저장 또는 업데이트
exports.storePreferences = (req, res) => {
    const { steamId } = req.params;
    const { preferences } = req.body;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'No preferences provided.'
        });
    }

    const preferencesData = readPreferencesFile();

    preferencesData[steamId] = req.body;

    writePreferencesFile(preferencesData);

    res.status(200).json({
        success: true,
        message: 'Preferences saved successfully.'
    });
};
