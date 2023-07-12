import { v4 as uuid } from 'uuid';
import { createCampDocument } from '../utility/firebase/firebase.utils.js';
import {CITY_DATA } from './cityData.js';
import {PLACES, DESCRIPTORS} from './PlacesAndDescriptors.js';

const RandomItems = array => array[Math.floor(Math.random() * array.length)];

const CITY=CITY_DATA;
for (let i = 0; i < 50; i++) {
    const random1000Nos = Math.floor(Math.random() * 1000);
    const camp ={
            id:uuid(),
            location: `${CITY[random1000Nos].city}, ${CITY[random1000Nos].state}`,
            title: `${RandomItems(DESCRIPTORS)} ${RandomItems(PLACES)}`,
            price:Math.floor(Math.random()*30)+10,
            image:'',
        }
        let res= await createCampDocument(camp);
        console.log(res);
    }