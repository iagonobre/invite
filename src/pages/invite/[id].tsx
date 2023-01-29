import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from 'axios';

import Lottie from 'react-lottie';
import animationData from '../../../public/assets/letter.json';
import { motion } from "framer-motion"

type Student = {
  name: string;
  cpf: string;
  phone: string;
}

export default function Home() {
  const [student, setStudent] = useState<Student>();
  const [isPaused, setIsPaused] = useState(true);
  const [opened, setOpened] = useState(false);

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function getStudent() {
      if (!id) {
        return;
      }
      try {
        const studentResponse = await axios.post('/api/list/student', { id })
        setStudent(studentResponse.data)
      } catch {
        router.push('/')
      }
    }
    getStudent()
  }, [id, router])

  if (!student) {
    return null;
  }

  if (opened) {
    return (
      <>
        <Head>
          <title>Uma noite em Hollywood</title>
        </Head>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}

        >
          <div className={styles.radiusContainer}>
            <img className={styles.image} src="/assets/logo.svg" alt="Uma noite em Hollywood - Formatura Meca 2019.1" />
            <div className={styles.line} />
            <div className={styles.contentContainer}>
              <h3 className={styles.title}>{student.name}</h3>
              <p className={styles.text}>tem a honra de convidar você para celebrar a sua formatura</p>
              <p className={styles.subtitle}>*tom vermelho exclusivo para os formandos</p>
              <Link href={`https://wa.me/55${student.phone}?text=Confirmo%20a%20minha%20presen%C3%A7a%20na%20formatura!`}>
                <button className={styles.button}>CONFIRMAR PRESENÇA</button>
              </Link>

            </div>

            <div className={styles.line} />
            <div className={styles.scheduleContainer}>
              <div className={styles.scheduleDate}>
                <p>25</p>
              </div>
              <div className={styles.scheduleInformation}>
                <div><p>FEVEREIRO</p></div>
                <div><p>20h00</p></div>
              </div>
            </div>
            <div className={styles.line} />

            <div className={styles.contentContainer}>
              <h3 className={styles.title}>Bouganville Hall</h3>
              <p className={styles.text}>Av. Comandante Petit, 263 - Centro, Parnamirim - RN - 59140-190</p>
            </div>

            <div className={styles.line} />
            <img className={styles.image} src="/assets/map.svg" alt="Mapa do local" />
            <div className={styles.line} />

            <footer className={styles.footer}>
              <Link href="https://www.google.com/maps/place/Bouganville+Recep%C3%A7%C3%B5es+%2F+Bouganville+Hall/@-5.9236953,-35.2626366,17z/data=!4m5!3m4!1s0x7b2570b138ea223:0x8ae01848a4829674!8m2!3d-5.9236953!4d-35.2626366">
                <button className={styles.button}>ABRIR MAPA</button>
              </Link>
            </footer>
          </div >
        </motion.div>
      </>
    )
  }

  return (
    <motion.div
      className={styles.lottieArea}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Abrir Convite</title>
      </Head>
      <button className={styles.lottieContainer} onClick={() => setIsPaused(false)}>
        <Lottie
          options={{
            animationData,
            autoplay: false,
            loop: false,
          }}
          isPaused={isPaused}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => setOpened(true),
            },
          ]}
          isClickToPauseDisabled={true}
        />
      </button>
      <button className={styles.buttonLottie} onClick={() => setIsPaused(false)}>ABRIR CONVITE</button>
    </motion.div>
  )
}
