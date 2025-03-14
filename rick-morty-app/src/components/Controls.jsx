import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import './Controls.css';

export default function Controls({ setFilters, setSort, onLoadMore }) {
    const { t, i18n } = useTranslation();

    const statusOptions = [
        { value: '', label: t('all') },
        { value: 'Alive', label: t('alive') },
        { value: 'Dead', label: t('dead') },
        { value: 'unknown', label: t('unknown') },
    ];

    const speciesOptions = [
        { value: '', label: t('all') },
        { value: 'Human', label: t('human') },
        { value: 'Alien', label: t('alien') },
    ];

    const sortOptions = [
        { value: 'name-asc', label: t('name-asc') },
        { value: 'name-desc', label: t('name-desc') },
        { value: 'origin-asc', label: t('origin-asc') },
        { value: 'origin-desc', label: t('origin-desc') },
    ];

    const languageOptions = [
        { value: 'en', label: t('english') },
        { value: 'de', label: t('german') },
    ];

    const handleFilterChange = (selectedOption, field) => {
        setFilters((prev) => ({ ...prev, [field]: selectedOption.value }));
    };

    return (
        <div className="controls">
            <div className="dropdown-container">
                <fieldset>
                    <legend>{t('sort')}</legend>
                    <Select
                        options={sortOptions}
                        onChange={(selected) => setSort(selected.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>{t('statusFilter')}</legend>
                    <Select
                        options={statusOptions}
                        onChange={(selected) =>
                            handleFilterChange(selected, 'status')
                        }
                    />
                </fieldset>
                <fieldset>
                    <legend>{t('speciesFilter')}</legend>
                    <Select
                        options={speciesOptions}
                        onChange={(selected) =>
                            handleFilterChange(selected, 'species')
                        }
                    />
                </fieldset>
                <fieldset>
                    <legend>{t('language')}</legend>
                    <Select
                        options={languageOptions}
                        onChange={(selected) => {
                            i18n.changeLanguage(selected.value);
                        }}
                        defaultValue={languageOptions[0]}
                    ></Select>
                </fieldset>
            </div>
            <div>
                <button className="styled-button-blue" onClick={onLoadMore}>
                    {t('loadMore')}
                </button>
            </div>
        </div>
    );
}
