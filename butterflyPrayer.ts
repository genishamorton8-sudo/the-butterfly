export function shouldOfferPrayer(text: string) {
  const lower = text.toLowerCase();

  return (
    lower.includes('pray') ||
    lower.includes('prayer') ||
    lower.includes('god') ||
    lower.includes('jesus') ||
    lower.includes('lord') ||
    lower.includes('faith') ||
    lower.includes('scared') ||
    lower.includes('afraid') ||
    lower.includes('overwhelmed') ||
    lower.includes('heavy') ||
    lower.includes('broken') ||
    lower.includes('hurting')
  );
}

export function createButterflyPrayer(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes('overwhelmed') || lower.includes('heavy')) {
    return `Heavenly Father,

Thank You for being near right now.

Your child is feeling overwhelmed, and You see every thought, every tear, and every burden they are carrying.

Please bring peace to their heart, calm to their body, and clarity to their mind. Remind them that they do not have to carry everything alone.

Give them strength for this moment and grace for the next step.

In Jesus' name,
Amen.`;
  }

  if (lower.includes('scared') || lower.includes('afraid')) {
    return `Heavenly Father,

Thank You for being a safe place in moments of fear.

Your child is feeling afraid, and I ask You to surround them with comfort, protection, and peace.

Remind them that You are with them, that they are not abandoned, and that fear does not get the final word.

Give them courage, wisdom, and a steady heart.

In Jesus' name,
Amen.`;
  }

  if (lower.includes('broken') || lower.includes('hurting')) {
    return `Heavenly Father,

Thank You for being close to the brokenhearted.

Your child is hurting, and You know exactly where the pain is tender.

Please meet them gently. Bring comfort where there has been sorrow, hope where there has been heaviness, and healing where there has been pain.

Remind them that they are still loved, still seen, and still held by You.

In Jesus' name,
Amen.`;
  }

  if (lower.includes('peace')) {
    return `Heavenly Father,

Thank You for the gift of peace.

I ask You to quiet every anxious thought and settle every place inside that feels unsettled.

Let Your peace guard this heart and mind today. Help them breathe, rest, and remember that You are near.

In Jesus' name,
Amen.`;
  }

  return `Heavenly Father,

Thank You for being present in this moment.

Please meet Your child right where they are. You know what they are carrying, what they need, and what they may not even have words to explain.

Bring comfort, wisdom, peace, strength, and hope.

Help them take one gentle step forward, knowing they are not alone.

In Jesus' name,
Amen.`;
}