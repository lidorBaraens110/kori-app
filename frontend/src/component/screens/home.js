import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import data from '../../data/allClothes';
import StandardCard from '../sideComponent/standardCard';
import CostumeCard from '../sideComponent/costumeCard';
import { initial } from '../../actions';
import { useDispatch } from 'react-redux'
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const [buyTheLook, setBuyTheLook] = useState(data.buyTheLook);
    const handleExpand = (x) => {
        const currentItem = buyTheLook.filter(item => item.bTL.id === x)
        currentItem[0].bTL.expand = true
        console.log(currentItem[0].bTL.expand)
        setBuyTheLook(preValue => [...preValue])
    }
    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(res => {
                dispatch(initial(res.data))
            })
            .catch(err => console.log(err))

    }, [])
    const handle = () => {
        alert('lakfnslka')
    }
    return (
        <div style={{ marginTop: '10rem', textAlign: 'center', padding: '5%' }}>
            <a href="mailto:'lidor110110@gmail.com'">lksnlksd</a>
            <img src='https://www.101domain.com/images/flags/large/SALE.png' style={{
                height: '10rem', width: '80%'
            }} />

            <div style={{ position: 'relative' }}>
                <img src='https://cdn1.expertreviews.co.uk/sites/expertreviews/files/styles/er_main_wide/public/2019/08/best_online_clothes_shops.jpg?itok=M3soL5rF'
                    style={{ height: '80%', width: '100%' }}
                />
                <Link to={{ pathname: '/feed', state: 'new Collection' }}>
                    <div style={{ border: 'solid black 1px', padding: '0.5rem 1rem', backgroundColor: 'white', position: 'absolute', top: '50%', right: '45%' }} >new collection</div>
                </Link>
            </div>
            <header><h1 style={{ padding: '3rem' }}>Looks We Love</h1></header>
            <Grid container spacing={10}>
                {buyTheLook.map(item => {
                    const { bTL, item1, item2 } = item;
                    //console.log(item.bTL.images[0])
                    return (
                        <Grid item
                            key={bTL.id}
                            xs={12} sm={12} md={4} lg={4} xl={4} style={{ textAlign: 'center' }} >
                            <StandardCard
                                style={{ padding: '0 3rem 0 ' }}
                                key={bTL.id}
                                // onMouseOver={handleMouseOver}
                                // onMouseOut={handleMouseOut}
                                id={bTL.id}
                                image={bTL.images[0]}

                            />
                            <div style={{ margin: '10% 0 10% 0', padding: '0 3rem 0' }}>

                                <Button

                                    onClick={() => handleExpand(bTL.id)}
                                    color='default'
                                    variant='contained'
                                    fullWidth
                                    style={{
                                        borderRadius: '0',
                                        color: 'white', backgroundColor: 'black'
                                    }}
                                >
                                    buy That Look
                                </Button>
                            </div>
                            {
                                bTL.expand &&
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <CostumeCard style={{ flex: 3 }} image={item1.images[0]} name={item1.name} />
                                    <div style={{ flex: 1 }}></div>
                                    <CostumeCard style={{ flex: 3 }} image={item2.images[0]} name={item2.name} />
                                </div>
                            }
                        </Grid>
                    )
                })}
            </Grid>
        </div >

    )
}
export default Home