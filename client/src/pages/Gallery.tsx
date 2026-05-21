import {useState, useEffect } from "react";
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

    // defines the expected input of ImageType
    interface ImageType {
        src: string;
        alt: string;
    }

    const [loadedImages, setLoadedImages] = useState<ImageType[]>([]);

    // function to delay stuff
    const delay = (ms: number) =>
    // resolve returns nothing and basically is just a placeholder returner thing
    // so that it can finish the promise
    new Promise(resolve => setTimeout(resolve, ms));

    // 
    useEffect(() => {
    const load = async () => {
        // resets loaded images to prevent duplicates
        setLoadedImages([]);
        
        // iterates through the array of images at the top of file
        for (let i = 0; i < images.length; i++) {
        // calls the function delay and waits until its finished
        await delay(300);
        // slices the images needed to be loaded (i.e. one at a time)
        setLoadedImages(images.slice(0, i + 1));
        }
    };

    load();
    }, []);


    return (
        <>
        <div>
            <p className="text-3xl font-bold mb-5">Gallery</p>
        </div>

        <div className="flex px-5 gap-10 flex-wrap justify-center" >
            {loadedImages.map((image, index) => (
                <div key={index} className="hover:scale-110 duration-200">
                <img src={image.src} alt={image.alt} 
                className="w-48 h-48 object-cover delay-100"/>
                </div>
            ))}
        </div>
        </>
   )
}