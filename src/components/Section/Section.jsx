import style from "./Section.module.scss";


const Section = ({children})=>{
    return ( <section className={style.section}>
        {children}
    </section> )
}

export default Section;