import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { useData } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const Slider = () => {
    const { data } = useData()
    const [index, setIndex] = useState(0)
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
        // Pour afficher les events de plus récent au plus ancien, on doit utilisé ">" ou lieu de "<";
        // Si evtA.date est antérieur à evtB.date, la fonction retourne -1,
        // indiquant que evtA devrait être placé avant evtB dans le tableau trié.
        // Sinon, la fonction retourne 1, indiquant que evtB devrait être placé avant evtA.
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1,
    )
    const nextCard = () => {
        setTimeout(
            // vue que l'index commence à 0, il a fallut ajouté (-1) a byDateDesc.length
            // pour éviter de se trouver avec un slide blanc de plus
            () => setIndex(index < (byDateDesc?.length ?? 0) - 1 ? index + 1 : 0),
            5000,
        )
    }
    useEffect(() => {
        nextCard()
    })
    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div key={uuid()}>
                    <div
                        key={uuid()}
                        className={`SlideCard SlideCard--${
                            index === idx ? "display" : "hide"
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateDesc?.map((_, radioIdx) => (
                                <input
                                    key={uuid()}
                                    type="radio"
                                    name="radio-button"
                                    // ici on doit utilisé "index" ou lieu de "idx", car
                                    // le "index" est actualisé selon le state, ce qui permet d'afficher le bouton-radio
                                    // qui correspond au slide affiché
                                    checked={index === radioIdx}
                                    onChange={() =>
                                        setIndex(byDateDesc.indexOf(event))
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Slider
