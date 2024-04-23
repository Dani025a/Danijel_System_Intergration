const data = {
    "navn": "Danijel",
    "Alder": 26,
    "Hobbies": ["Coding", "working out", "Sport"]
    
};

const marshalledData = JSON.stringify(data);

console.log("Marshalled Data:", marshalledData);

const unmarshalledData = JSON.parse(marshalledData);

console.log("Unmarshalled Data:", unmarshalledData);
