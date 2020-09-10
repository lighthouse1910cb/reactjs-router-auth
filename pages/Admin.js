import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, 
  Card,
  Form,
  Input
} from '../components/AuthForms';

function Admin(props) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [dev, setDev] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://nodejs-mongo-jwt.herokuapp.com/api/dev'
      );

      setDev(result.data);
    };

    fetchData();
  }, []);

  const removeDev = async (id) => {
    const url = `https://nodejs-mongo-jwt.herokuapp.com/api/dev/${id}`;
    await axios.delete(url).then(() => {
      setDev(dev.filter((item) => item._id !== id));
      console.log(dev);
    });
  };

  function postCreate() {
    const create = async () => {
     await axios.post("https://nodejs-mongo-jwt.herokuapp.com/api/dev", {
        name,
        title,
        level
      }).then(result => {
        if (result.status === 200) {
          console.log(result);
          setName("");
          setTitle("");
          setLevel("");
          const newDev = result.data;
          setDev([...dev, newDev]);
        } 
      }).catch(e => {
        console.log(e);
      });
    }
    create();
  }

  return (
    <div>
      <h2>Admin Page</h2>
      <Card>
        <Form>
          <Input
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='name'
          />
          <Input
            type='text'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder='title'
          />
          <Input
            type='text'
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            placeholder='level'
          />
          <Button onClick={postCreate}>Create</Button>
        </Form>
      </Card>
      {dev ? (
        <div>
          {' '}
          Dev list
          <ul>
            {dev.map((item) => (
              <li key={item._id}>
                <strong>{item.name} &nbsp;</strong>
                <span>{item.title}</span>
                <button onClick={() => removeDev(item._id)}>delete</button>
              </li>
            ))}
          </ul>
          <div>
            total: <strong>{dev.length}</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Admin;
