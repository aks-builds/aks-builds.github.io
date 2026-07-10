import cardStyles from "./cards.module.css";
import styles from "./TalkCard.module.css";
import type { Talk } from "@/lib/data/talks";

export default function TalkCard({ talk }: { talk: Talk }) {
  return (
    <a
      href={talk.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardStyles.card} ${styles.talkCard}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${talk.youtubeId}/hqdefault.jpg`} alt={talk.title} />
      <div>
        <div className={styles.tt}>{talk.title}</div>
        <div className={styles.tc}>{talk.channel} ↗</div>
      </div>
    </a>
  );
}
