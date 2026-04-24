import Test1 from '../assets/GalleryTest.png'
import Test2 from '../assets/GalleryTest2.png'

export default function Gallery(){
    const images = [
        {src: Test1, alt: "test-photo"}, 
        {src: Test2, alt: "test-photo"}, 
        {src: Test1, alt: "test-photo"}, 
        {src: Test2, alt: "test-photo"}, 
        {src: Test1, alt: "test-photo"}, 
        {src: Test2, alt: "test-photo"}, 
        {src: Test1, alt: "test-photo"}, 
        {src: Test2, alt: "test-photo"},
        {src: Test1, alt: "test-photo"},
        {src: Test2, alt: "test-photo"}
    ]
    return (
        <>
        <div>
            <p className="text-3xl font-bold mb-5">Gallery</p>
        </div>

        <div className="flex px-5 gap-10 flex-wrap justify-center" >
            {images.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} 
                className="w-48 h-48 object-cover" />
            ))}
        </div>
        </>
   )
}