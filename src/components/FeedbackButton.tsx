import React, { useState } from "react"
import { createUseStyles } from "react-jss"
import { giveFeedback } from "../clib/api"
import { Modal } from "../components/Modal"
import { notify } from "../state/Actions"
import { useStateValue } from "../state/StateProvider"

const useStyles = createUseStyles({
    btn: {
        position: "fixed",
        bottom: 40,
        right: 100,
        backgroundColor: "#246bf8",
        borderRadius: 30,
        border: "none",
        color: "white",
        height: 30,
        width: 130,
        fontSize: 13,
        cursor: "pointer",
        boxShadow: "2px 4px 6px 2px rgb(0 0 0 / 20%)",
        '@media (max-width: 1000px)': {
            display: "none"
        }
    },
    textarea: { 
        width: "100%", 
        height: 70, 
        padding: 10,
        resize: "none",
        borderRadius: 4,
        border: "none",
        fontSize: 13,
        fontFamily: "Arial"
    },
    question: {
        color: "white",
        fontSize: 15,
        marginBottom: 10
    }
})

const FeedbackButton = () => {

    const styles = useStyles()
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
    const [action, setAction] = useState("")
    const [payForServiceAnswer, setPayForServiceAnswer] = useState("")
    const [featuresUsefulAnswer, setFeaturesUsefulAnswer] = useState("")
    const [featuresNotUsefulAnswer, setFeaturesNotUsefulAnswer] = useState("")
    const [howCanImprove, setHowCanImprove] = useState("")

    // @ts-ignore
    const [_state, dispatch] = useStateValue()

    const onClickFeedback = () => [
        setFeedbackModalOpen(true)
    ]

    const buildFeedback = () => {
        return `
Would you pay for this service?
${payForServiceAnswer}

What features do you find useful?
${featuresUsefulAnswer}

What features do you think are bad?
${featuresNotUsefulAnswer}

How can Tigum improve?
${howCanImprove}
        `
    }

    const onSubmitFeedback = async () => {
        setAction("Give Feedback")
        const feedbackText = buildFeedback();
        await giveFeedback(feedbackText)
        notify(dispatch, "Thanks for your feedback!", "success", "right")
        clear()
    }

    const clear = () => {
        setAction("")
        setFeaturesNotUsefulAnswer("")
        setFeaturesUsefulAnswer("")
        setHowCanImprove("")
        setPayForServiceAnswer("")
        setFeedbackModalOpen(false)
    }

    const onChangePayForService = (evt) => {
        setPayForServiceAnswer(evt.target.value)
    }

    const onChangeFeaturesUseful = (evt) => {
        setFeaturesUsefulAnswer(evt.target.value)
    }

    const onChangeFeaturesNotUseful = (evt) => {
        setFeaturesNotUsefulAnswer(evt.target.value)
    }

    const onChangeHowCanImprove = (evt) => {
        setHowCanImprove(evt.target.value)
    }

    return (
        <>
        <Modal
            title='Give Feedback'
            display={feedbackModalOpen}
            actions={[{
                text: "Give Feedback",
                textColor: "white",
                btnColor: "#246bf8",
                action: onSubmitFeedback,
                position: "right"
            }]}
            toggleModal={() => {
                setFeedbackModalOpen(false)
            }}
            loadingAction={action}
        >
            <h4 className={styles.question}>Would you pay for this service?</h4>
            <textarea 
                className={styles.textarea} 
                placeholder="Answer: Yes, No or Maybe if you change something..."
                onChange={onChangePayForService}
                value={payForServiceAnswer}
            />
            <h4 className={styles.question}>What features do you find useful?</h4>
            <textarea 
                className={styles.textarea} 
                placeholder="Answer..."
                onChange={onChangeFeaturesUseful}
                value={featuresUsefulAnswer}
            />
            <h4 className={styles.question}>What features do you think are bad?</h4>
            <textarea 
                className={styles.textarea} 
                placeholder="Answer..."
                onChange={onChangeFeaturesNotUseful}
                value={featuresNotUsefulAnswer}
            />
            <h4 className={styles.question}>How can Tigum improve?</h4>
            <textarea 
                className={styles.textarea} 
                placeholder="Answer..."
                onChange={onChangeHowCanImprove}
                value={howCanImprove}
            />
        </Modal>
        <button className={styles.btn} onClick={onClickFeedback}>
            Give Feedback
        </button>
        </>
    )
}

export default FeedbackButton