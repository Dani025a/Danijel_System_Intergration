const data = {
    "navn": "Danijel",
    "Alder": 26,
    "Hobbies": ["Coding", "working out", "Sport"]
    
};

const serializedData = JSON.stringify(data);

console.log("Serialized Data:", serializedData);

const deserializedData = JSON.parse(serializedData);

console.log("Deserialized Data:", deserializedData);
