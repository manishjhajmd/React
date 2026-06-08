import { useState } from 'react';
import { QRCode, Form, Input, Button } from 'antd';
import { useRef } from 'react';
import { Modal } from 'antd';
function Qrcode() {
    const Qref = useRef();
    const [message, setMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [icon, setIcon] = useState('');
    const [qr, setQr] = useState({
        value: 'www.linkedin.com/in/manish-jha-994b306a',
        bgColor: 'white',
        color: 'black',
        icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png'
    });
    const downloadQRCode = async (e) => {
        const div = Qref.current;
        const canvas = div.querySelector('canvas');
        const base64String = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = base64String;
        a.download = 'qrcode.png';
        a.click();
        a.remove();
        setIsOpen(false)
    }
    const handelGenrate = (values) => {
        setQr({
            value: values.value || qr.value,
            bgColor: values.bgColor || qr.bgColor,
            color: values.color || qr.color,
            icon: icon,
        })
        console.log(values)
        setIsOpen(false)
    }

    const handelClose = () => {
        setIsOpen(false)
    }


    const handleChooseIcon = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file)
        setIcon(url)
    }


    return (
        <div className="min-h-screen bg-slate-100">
            <div className="w-9/12 mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 my-2">Download QR CODE</h1>

                <div className="flex  w-9/12" ref={Qref}>
                    <QRCode bgColor={qr.bgColor} width={300}  icon={qr.icon} color={qr.color} value={qr.value || ''} />
                </div>
                <button onClick={() => setIsOpen(true)} className="bg-rose-500 p-2 rounded mt-3">Generate</button>
                <button onClick={downloadQRCode} className="bg-blue-300 p-2 rounded mt-3">Download</button>
            </div>
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpen}
                footer={null}
                onCancel={handelClose}
            >
                <Form onFinish={handelGenrate} >
                    <Form.Item label="Url" name="value" rules={[{ required: true, message: 'Please enter a URL or text' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="BG Color" name="bgColor">
                        <Input type="color" />
                    </Form.Item>
                    <Form.Item label="FG Color" name="color">
                        <Input type="color" />
                    </Form.Item>
                    <Form.Item label="Icon URL" name="icon">
                        <Input type="file" accept='*image/*' onChange={handleChooseIcon} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Generate
                    </Button>
                </Form>
            </Modal>
        </div>
    )



}

export default Qrcode;