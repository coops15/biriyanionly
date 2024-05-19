export default function Heading({subheading,heading}){
    return(
        <div className="text-center mt-10 mb-5">
                <h5 className="text-2xl text-gray-400 font-semibold uppercase">{subheading}</h5>
                <h3 className="text-3xl text-primary font-semibold">{heading}</h3>
            </div>
    )
}