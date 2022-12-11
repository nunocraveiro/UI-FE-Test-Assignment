import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductView.css';

type Props = {
    viewToggle: string,
    devices: any
}

const ProductsView = (props: Props) => {
    const navigate = useNavigate();

    const navigateToDevicePage = (e: MouseEvent<HTMLDivElement>, modelId: string) => {
        e.preventDefault();
        navigate(`/devices/${modelId}`)
    }

    if (props.viewToggle === 'list') {
        return (
            <section className='deviceList'>
                <div className='deviceListRow titleRow'>
                    <p className='rowFirstItem deviceNum'>{props.devices.length} devices</p>
                    <p className='rowSecondItem rowTitle'>PRODUCT LINE</p>
                    <p className='rowThirdItem rowTitle'>NAME</p>
                </div>
                {props.devices/* .slice(0, 50) */.map((device: any) => (
                    <div className='deviceListRow' key={device.model_id} onClick={e => navigateToDevicePage(e, device.model_id)}>
                        <p className='rowFirstItem'>
                            <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_51x51.png`} alt='device'/>
                        </p>
                        <p className='rowSecondItem deviceText'>{device.line.name}</p>
                        <p className='rowThirdItem deviceText'>{device.product.name}</p>
                    </div>
                ))}
            </section>
        )
    }
    return (
        <section className='deviceGridContainer'>
            <p className='deviceNum'>{props.devices.length} devices</p>
            <section className='deviceGrid'>
                {props.devices/* .slice(0, 50) */.map((device: any) => (
                    <div className='deviceGridCard' key={device.model_id} onClick={e => navigateToDevicePage(e, device.model_id)}>
                        <p className='deviceGridImg'>
                            <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_129x129.png`} alt='device'/>
                        </p>
                        <div className='deviceGridText'>
                            <p>{device.product.name}</p>
                            <p className='deviceGridLineName'>{device.line.name}</p>
                        </div>
                    </div>
                ))} 
            </section>
        </section>
    )
}

export default ProductsView;