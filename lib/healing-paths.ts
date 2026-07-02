import type { HealingTheme } from './butterfly-brain';

export type HealingPath = {
  title: string;
  message: string;
  scripture: string;
  prayer: string;
  steps: {
    emoji: string;
    title: string;
    description: string;
    route: string;
  }[];
};

export function getHealingPath(theme: HealingTheme): HealingPath {
  switch (theme) {
    case 'fear':
    case 'anxiety':
      return {
        title: 'Peace Path',
        message: 'Start with peace. You do not have to carry fear alone.',
        scripture: 'Isaiah 41:10',
        prayer: 'Pray for courage, peace, and a steady heart.',
        steps: [
          { emoji: '🙏', title: 'Prayer Room', description: 'Begin by giving the fear to God.', route: '/prayer' },
          { emoji: '📖', title: 'Scripture Vault', description: 'Hold onto truth while your heart settles.', route: '/scripture-vault' },
          { emoji: '🧠', title: 'Change the Thought', description: 'Challenge the thought that is feeding the fear.', route: '/(tabs)/change-the-thought' },
        ],
      };

    case 'grief':
      return {
        title: 'Comfort Path',
        message: 'Give yourself room to grieve with honesty and gentleness.',
        scripture: 'Psalm 34:18',
        prayer: 'Pray for comfort, strength, and permission to feel.',
        steps: [
          { emoji: '📝', title: 'Journal', description: 'Write what your heart needs to say.', route: '/(tabs)/journal' },
          { emoji: '🙏', title: 'Prayer Room', description: 'Let God meet you in the sorrow.', route: '/prayer' },
          { emoji: '🌸', title: 'Garden', description: 'Plant a reminder that love still matters.', route: '/(tabs)/garden' },
        ],
      };

    case 'shame':
      return {
        title: 'Freedom Path',
        message: 'Shame is not your name. Truth gets the final word.',
        scripture: 'Romans 8:1',
        prayer: 'Pray for freedom from shame and courage to receive grace.',
        steps: [
          { emoji: '🌅', title: 'Rewrite the Scene', description: 'Bring compassion and protection into the painful place.', route: '/rewrite-scene' },
          { emoji: '🧠', title: 'Change the Thought', description: 'Replace the lie with truth.', route: '/(tabs)/change-the-thought' },
          { emoji: '📖', title: 'Scripture Vault', description: 'Anchor your identity in truth.', route: '/scripture-vault' },
        ],
      };

    case 'anger':
      return {
        title: 'Release Path',
        message: 'Anger may be showing you where something still hurts.',
        scripture: 'Ephesians 4:31-32',
        prayer: 'Pray for wisdom, release, and healthy boundaries.',
        steps: [
          { emoji: '🧠', title: 'Change the Thought', description: 'Sort through the thought underneath the anger.', route: '/(tabs)/change-the-thought' },
          { emoji: '📝', title: 'Journal', description: 'Name what hurt without judging yourself.', route: '/(tabs)/journal' },
          { emoji: '🙏', title: 'Prayer Room', description: 'Ask God for wisdom and release.', route: '/prayer' },
        ],
      };

    case 'loneliness':
      return {
        title: 'Connection Path',
        message: 'You are not meant to heal alone.',
        scripture: 'Deuteronomy 31:6',
        prayer: "Pray for God's presence and healthy connection.",
        steps: [
          { emoji: '🤝', title: 'Butterfly Partner', description: 'Move toward encouragement and support.', route: '/(tabs)/accountability' },
          { emoji: '🙏', title: 'Prayer Room', description: 'Remember God is near.', route: '/prayer' },
          { emoji: '📝', title: 'Journal', description: 'Write what connection means to you today.', route: '/(tabs)/journal' },
        ],
      };

    case 'purpose':
      return {
        title: 'Purpose Path',
        message: 'Your story still has meaning.',
        scripture: 'Jeremiah 29:11',
        prayer: 'Pray for direction, wisdom, and courage to keep becoming.',
        steps: [
          { emoji: '📖', title: 'Scripture Vault', description: 'Start with truth about your future.', route: '/scripture-vault' },
          { emoji: '📝', title: 'Journal', description: 'Write what you feel called toward.', route: '/(tabs)/journal' },
          { emoji: '🌸', title: 'Garden', description: 'Celebrate the growth already happening.', route: '/(tabs)/garden' },
        ],
      };

    default:
      return {
        title: 'Gentle Path',
        message: 'Begin with one small step. You do not have to do everything today.',
        scripture: 'Psalm 46:10',
        prayer: 'Spend a few quiet moments with God today.',
        steps: [
          { emoji: '📝', title: 'Journal', description: 'Start by writing what is true today.', route: '/(tabs)/journal' },
          { emoji: '🙏', title: 'Prayer Room', description: 'Take a quiet moment with God.', route: '/prayer' },
          { emoji: '🌸', title: 'Garden', description: 'Honor one small sign of growth.', route: '/(tabs)/garden' },
        ],
      };
  }
}