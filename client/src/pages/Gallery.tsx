import Test from '../assets/GalleryTest.png'
import Test2 from '../assets/GalleryTest2.png'

export default function Gallery(){
   return (
    <>
    <div className="flex px-5 gap-10 flex-wrap justify-center" >
    <img src={Test} alt="test-photo"/>
    <img src={Test2} alt="test-photo"/>
    <img src={Test} alt="test-photo"/>
    <img src={Test2} alt="test-photo"/>
    <img src={Test} alt="test-photo"/>
    <img src={Test2} alt="test-photo"/>
    <img src={Test} alt="test-photo"/>
    <img src={Test2} alt="test-photo"/>
    <img src={Test} alt="test-photo"/>
    <img src={Test2} alt="test-photo"/>
    </div>
    </>
   )
}