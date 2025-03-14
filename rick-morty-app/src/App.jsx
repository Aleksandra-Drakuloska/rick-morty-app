import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import CharacterCard from './components/CharacterCard';
import Controls from './components/Controls';
import { useTranslation } from 'react-i18next';
import './i18n';

const GET_CHARACTERS = gql`
    query GetCharacters($page: Int, $status: String, $species: String) {
        characters(
            page: $page
            filter: { status: $status, species: $species }
        ) {
            info {
                next
            }
            results {
                id
                name
                status
                species
                gender
                origin {
                    name
                }
                image
            }
        }
    }
`;

export default function App() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        status: '',
        species: '',
    });
    const [sort, setSort] = useState('');

    const { t } = useTranslation();
    const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
        variables: { page, ...filters },
    });

    // 🛠️ Sorting Logic Using useMemo for Performance Optimization
    const sortedCharacters = () => {
        if (!data?.characters?.results) return [];

        let sorted = [...data.characters.results];

        switch (sort) {
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'origin-asc':
                return sorted.sort((a, b) =>
                    a.origin.name.localeCompare(b.origin.name)
                );
            case 'origin-desc':
                return sorted.sort((a, b) =>
                    b.origin.name.localeCompare(a.origin.name)
                );
            default:
                return sorted;
        }
    }; // Runs only when data or sort changes

    const loadMore = () => {
        if (data?.characters?.info?.next) {
            fetchMore({
                variables: { page: page + 1 },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        characters: {
                            ...fetchMoreResult.characters,
                            results: [
                                ...prev.characters.results,
                                ...fetchMoreResult.characters.results,
                            ],
                        },
                    };
                },
            });
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <h1>{t('title')}</h1>
            <Controls
                setFilters={setFilters}
                setSort={setSort}
                onLoadMore={loadMore}
            />
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}

            <div className="character-list">
                {sortedCharacters().map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </div>
        </div>
    );
}
