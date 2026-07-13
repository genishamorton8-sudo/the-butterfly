import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { addGrowth } from '../../lib/garden';

const SYMBOLS = ['🌸', '🌺', '🌻', '🌷', '🌹', '🦋', '🌿', '✨'];

type Tile = {
  id: number;
  symbol: string;
  matched: boolean;
};

function buildBoard(): Tile[] {
  const pairSymbols = [...SYMBOLS, ...SYMBOLS];

  const shuffled = pairSymbols
    .map((symbol) => ({ symbol, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((item, i) => ({
      id: i,
      symbol: item.symbol,
      matched: false,
    }));

  return shuffled;
}

export default function BloomMatchScreen() {
  const [tiles, setTiles] = useState<Tile[]>(buildBoard);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false);

  const matchedCount = useMemo(
    () => tiles.filter((tile) => tile.matched).length,
    [tiles]
  );

  const isComplete = matchedCount === tiles.length;

  useEffect(() => {
    if (isComplete && !rewardGiven) {
      setRewardGiven(true);
      addGrowth(15);
    }
  }, [isComplete, rewardGiven]);

  function handleTilePress(tile: Tile) {
    if (busy || tile.matched || flippedIds.includes(tile.id)) {
      return;
    }

    const nextFlipped = [...flippedIds, tile.id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setBusy(true);
      setMoves((count) => count + 1);

      const [firstId, secondId] = nextFlipped;
      const firstTile = tiles.find((t) => t.id === firstId);
      const secondTile = tiles.find((t) => t.id === secondId);

      if (firstTile && secondTile && firstTile.symbol === secondTile.symbol) {
        setTimeout(() => {
          setTiles((current) =>
            current.map((t) =>
              t.id === firstId || t.id === secondId ? { ...t, matched: true } : t
            )
          );
          setFlippedIds([]);
          setBusy(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  function playAgain() {
    setTiles(buildBoard());
    setFlippedIds([]);
    setMoves(0);
    setBusy(false);
    setRewardGiven(false);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🦋 Bloom Match</Text>

        <Text style={styles.subtitle}>
          No timer, no pressure. Just a slow, gentle match.
        </Text>

        <Text style={styles.stats}>
          Matches: {matchedCount / 2} of {tiles.length / 2} · Moves: {moves}
        </Text>

        <View style={styles.board}>
          {tiles.map((tile) => {
            const isFlipped = tile.matched || flippedIds.includes(tile.id);

            return (
              <TouchableOpacity
                key={tile.id}
                style={[styles.tile, tile.matched && styles.tileMatched]}
                onPress={() => handleTilePress(tile)}
                activeOpacity={0.8}
              >
                <Text style={styles.tileSymbol}>{isFlipped ? tile.symbol : '🌙'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isComplete && (
          <View style={styles.winCard}>
            <Text style={styles.winTitle}>Your garden bloomed 🌸</Text>

            <Text style={styles.winText}>
              You matched every pair in {moves} moves. Well done taking this
              gentle moment for yourself.
            </Text>

            <TouchableOpacity style={styles.button} onPress={playAgain}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/calming-games' as any)}
        >
          <Text style={styles.secondaryButtonText}>Back to Calming Games</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F3',
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#4B1D7A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '800',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  tile: {
    width: '21%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F1D7A7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tileMatched: {
    backgroundColor: '#F4FBF4',
    borderColor: '#8FCB9B',
  },
  tileSymbol: {
    fontSize: 26,
  },
  winCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 22,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginTop: 24,
    alignItems: 'center',
  },
  winTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4B1D7A',
    marginBottom: 10,
    textAlign: 'center',
  },
  winText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#E75480',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 26,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#4B1D7A',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 26,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4B1D7A',
    fontSize: 15,
    fontWeight: '900',
  },
});