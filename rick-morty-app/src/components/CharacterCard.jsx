import { useTranslation } from 'react-i18next';
import './CharacterCard.css';

export default function CharacterCard({ character }) {
    const { t } = useTranslation();

    return (
        <div className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>
                {t('status')}: {t(character.status)}
            </p>
            <p>
                {t('species')}: {t(character.species)}
            </p>
            <p>
                {t('gender')}: {t(character.gender)}
            </p>
            <p>
                {t('origin')}: {character.origin.name}
            </p>
        </div>
    );
}
