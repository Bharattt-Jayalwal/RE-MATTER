import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

export const palette = {
  ink: "#071A24",
  inkSoft: "#0B2530",
  surface: "#102F3A",
  surface2: "#153A45",
  line: "#24505A",
  text: "#F3F8F4",
  muted: "#9CB5B4",
  mint: "#C7F36B",
  mintSoft: "#DDF8A0",
  teal: "#67D8BA",
  amber: "#FFCB70",
  coral: "#FF9077",
  blue: "#78B8FF",
};

export function impact() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  }
}

export function Card({ children, style, tone = "default" }: { children: ReactNode; style?: object; tone?: "default" | "mint" | "blue" | "amber" }) {
  return <View style={[styles.card, tone === "mint" && styles.cardMint, tone === "blue" && styles.cardBlue, tone === "amber" && styles.cardAmber, style]}>{children}</View>;
}

export function Eyebrow({ children, color = palette.mint }: { children: ReactNode; color?: string }) {
  return <Text style={[styles.eyebrow, { color }]}>{children}</Text>;
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onAction ? (
        <Pressable onPress={() => { impact(); onAction(); }} style={({ pressed }) => [styles.textAction, pressed && styles.pressed]}>
          <Text style={styles.textActionLabel}>{action}</Text>
          <MaterialIcons name="arrow-forward" size={15} color={palette.mint} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function Pill({ label, color = palette.mint, background = "rgba(199,243,107,0.14)" }: { label: string; color?: string; background?: string }) {
  return <View style={[styles.pill, { backgroundColor: background }]}><View style={[styles.dot, { backgroundColor: color }]} /><Text style={[styles.pillText, { color }]}>{label}</Text></View>;
}

export function PrimaryButton({ label, onPress, icon = "arrow-forward", variant = "primary", small = false }: { label: string; onPress: () => void; icon?: keyof typeof MaterialIcons.glyphMap; variant?: "primary" | "secondary" | "ghost"; small?: boolean }) {
  return (
    <Pressable onPress={() => { impact(); onPress(); }} style={({ pressed }) => [styles.button, small && styles.buttonSmall, variant === "secondary" && styles.buttonSecondary, variant === "ghost" && styles.buttonGhost, pressed && styles.buttonPressed]}>
      <Text style={[styles.buttonLabel, variant !== "primary" && styles.buttonLabelAlt]}>{label}</Text>
      {icon ? <MaterialIcons name={icon} size={small ? 16 : 18} color={variant === "primary" ? palette.ink : palette.mint} /> : null}
    </Pressable>
  );
}

export function ProgressBar({ value, color = palette.mint, height = 8 }: { value: number; color?: string; height?: number }) {
  return <View style={[styles.progressTrack, { height }]}><View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color, height }]} /></View>;
}

export function Stat({ value, label, accent = palette.text, compact = false }: { value: string; label: string; accent?: string; compact?: boolean }) {
  return <View style={compact ? styles.statCompact : styles.stat}><Text style={[compact ? styles.statValueCompact : styles.statValue, { color: accent }]}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

export function IconBadge({ name, color = palette.mint, background = "rgba(199,243,107,0.13)", size = 42 }: { name: keyof typeof MaterialIcons.glyphMap; color?: string; background?: string; size?: number }) {
  return <View style={[styles.iconBadge, { width: size, height: size, borderRadius: size / 3, backgroundColor: background }]}><MaterialIcons name={name} size={size * 0.48} color={color} /></View>;
}

export function MiniBar({ label, value, max, color = palette.mint, suffix = "" }: { label: string; value: number; max: number; color?: string; suffix?: string }) {
  return (
    <View style={styles.miniBarRow}>
      <View style={styles.miniBarLabels}><Text style={styles.body}>{label}</Text><Text style={[styles.bodyStrong, { color }]}>{value}{suffix}</Text></View>
      <ProgressBar value={(value / max) * 100} color={color} height={6} />
    </View>
  );
}

export const styles = StyleSheet.create({
  card: { backgroundColor: palette.surface, borderRadius: 22, borderWidth: 1, borderColor: "rgba(103,216,186,0.12)", padding: 18 },
  cardMint: { backgroundColor: "#183A32", borderColor: "rgba(199,243,107,0.34)" },
  cardBlue: { backgroundColor: "#122E45", borderColor: "rgba(120,184,255,0.28)" },
  cardAmber: { backgroundColor: "#3A2E1B", borderColor: "rgba(255,203,112,0.28)" },
  eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 1.6, lineHeight: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { color: palette.text, fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  textAction: { flexDirection: "row", alignItems: "center", gap: 3, paddingVertical: 6, paddingLeft: 8 },
  textActionLabel: { color: palette.mint, fontSize: 12, fontWeight: "800" },
  pressed: { opacity: 0.72 },
  pill: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  pillText: { fontSize: 11, fontWeight: "800", letterSpacing: 0.4 },
  button: { minHeight: 52, borderRadius: 16, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, backgroundColor: palette.mint },
  buttonSmall: { minHeight: 42, borderRadius: 13, paddingHorizontal: 13 },
  buttonSecondary: { backgroundColor: "rgba(103,216,186,0.14)", borderWidth: 1, borderColor: "rgba(103,216,186,0.3)" },
  buttonGhost: { backgroundColor: "transparent", borderWidth: 1, borderColor: palette.line },
  buttonLabel: { color: palette.ink, fontSize: 14, fontWeight: "900" },
  buttonLabelAlt: { color: palette.mint },
  buttonPressed: { transform: [{ scale: 0.97 }], opacity: 0.88 },
  progressTrack: { width: "100%", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" },
  progressFill: { borderRadius: 99 },
  stat: { flex: 1, minWidth: 80 },
  statCompact: { minWidth: 78 },
  statValue: { fontSize: 25, fontWeight: "900", letterSpacing: -1 },
  statValueCompact: { fontSize: 18, fontWeight: "900", letterSpacing: -0.5 },
  statLabel: { color: palette.muted, fontSize: 11, marginTop: 4, lineHeight: 15 },
  iconBadge: { alignItems: "center", justifyContent: "center" },
  miniBarRow: { marginBottom: 14 },
  miniBarLabels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 7 },
  body: { color: palette.muted, fontSize: 13, lineHeight: 19 },
  bodyStrong: { color: palette.text, fontSize: 13, fontWeight: "800" },
});
