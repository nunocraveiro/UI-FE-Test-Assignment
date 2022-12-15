import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Product.css';
import back from '../assets/Back-icon.svg';

const Product = () => {
    const {id} = useParams();
    const [device, setDevice] = useState<any>([]);
    const navigate = useNavigate();

    const handleBackClick = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        navigate('/devices/');
    }

    useEffect(() => {
        fetch('https://static.ui.com/fingerprint/ui/public.json')
          .then((res) => res.json())
          .then((data) => setDevice(data.devices.find((element: any) => element.id === id)));
    }, [id]);

    return (
        <section>
            <section className='devicePageHeader'>
                <img className='backBtn' src={back} alt='back' onClick={handleBackClick}/>
            </section>
            <section className='devicePageCardContainer'>
                <div className='devicePageCard'>
                    <div className='deviceInfo'>
                        <h2>{device.product?.name}</h2>
                        <div className='deviceInfoRow'>
                            <p>Product line</p>
                            <p>{device.line?.name}</p>
                        </div>
                        <div className='deviceInfoRow'>
                            <p>ID</p>
                            <p>{device.line?.id}</p>
                        </div>
                        <div className='deviceInfoRow'>
                            <p>Name</p>
                            <p>{device.product?.name}</p>
                        </div>
                        <div className='deviceInfoRow'>
                            <p>Short name</p>
                            {device.shortnames && <p>{device.shortnames[0]}</p>}
                        </div>
                        <div className='deviceInfoRow'>
                            <p>Max. power</p>
                            <p>25 W</p>
                        </div>
                        {device.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond && <div className='deviceInfoRow'>
                            <p>Speed</p>
                            <p>{device.unifi.network.ethernetMaxSpeedMegabitsPerSecond} Mbps</p>
                        </div>}
                        {device.unifi?.network?.numberOfPorts && <div className='deviceInfoRow'>
                            <p>Number of ports</p>
                            <p>{device.unifi.network.numberOfPorts}</p>
                        </div>}
                    </div>
                </div>
                <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon?.id}_257x257.png`} alt='device'/>
            </section>
        </section>
    )
}

export default Product;