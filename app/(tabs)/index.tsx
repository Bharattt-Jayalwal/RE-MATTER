import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { estimateDepositCredit } from "@/shared/rematter-demo";
import { Card, Eyebrow, IconBadge, MiniBar, Pill, PrimaryButton, ProgressBar, SectionTitle, Stat, impact, palette, styles as ui } from "@/components/rematter-ui";

type Role = "Household" | "Restaurant" | "Collector" | "Processor" | "Manufacturer";

const roles: { label: Role; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { label: "Household", icon: "home" },
  { label: "Restaurant", icon: "restaurant" },
  { label: "Collector", icon: "local-shipping" },
  { label: "Processor", icon: "factory" },
  { label: "Manufacturer", icon: "business" },
];

const depositOptions = [
  { label: "Citrus peel", icon: "🍊", detail: "Biomass" },
  { label: "Used oil", icon: "🛢️", detail: "Liquid stream" },
  { label: "Coffee grounds", icon: "☕", detail: "Biomass" },
];

const demoSteps = [
  ["01", "Source captured", "Restaurant separates 8.4 kg of citrus peel at ABC Café."],
  ["02", "Smart Pod detected", "RM-POD-0021 updates fill level and quality signals."],
  ["03", "Pickup optimized", "Matter AI assigns Aarav Logistics on the best route."],
  ["04", "Batch verified", "The processor creates a traceable material passport."],
  ["05", "Next use unlocked", "A potential manufacturer requests a technical sample."],
];

export default function HomeScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Household");
  const [depositOpen, setDepositOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [pitchOpen, setPitchOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [weight, setWeight] = useState("1.8");
  const [selectedMaterial, setSelectedMaterial] = useState("Citrus peel");
  const [depositComplete, setDepositComplete] = useState(false);

  const roleCopy = useMemo(() => {
    if (role === "Collector") return { greeting: "Route-ready morning", sub: "7 pickups are waiting across Ahmedabad." };
    if (role === "Processor") return { greeting: "Operations overview", sub: "3 batches need attention today." };
    if (role === "Manufacturer") return { greeting: "Supply intelligence", sub: "12 verified materials match your watchlist." };
    if (role === "Restaurant") return { greeting: "Good morning, ABC Café", sub: "Your citrus stream is on track this week." };
    return { greeting: "Good morning, Aditi", sub: "Your recovery is creating the next beginning." };
  }, [role]);

  function closeDeposit() {
    setDepositOpen(false);
    setDepositComplete(false);
    setWeight("1.8");
    setSelectedMaterial("Citrus peel");
  }

  function runDemo() {
    setDemoStep(0);
    setDemoOpen(true);
  }

  return (
    <ScreenContainer containerClassName="bg-background" className="p-0">
      <ScrollView contentContainerStyle={local.content} showsVerticalScrollIndicator={false}>
        <View style={local.topbar}>
          <View style={local.brandLockup}>
            <View style={local.brandMark}><Text style={local.brandMarkText}>R</Text></View>
            <View><Text style={local.brand}>RE:MATTER</Text><Text style={local.brandSub}>NEXT USE NETWORK</Text></View>
          </View>
          <Pressable onPress={() => router.push("/profile")} style={({ pressed }) => [local.avatar, pressed && ui.pressed]}><Text style={local.avatarText}>A</Text></Pressable>
        </View>

        <View style={local.heroRow}>
          <View style={local.heroCopy}>
            <Text style={local.heroKicker}>{roleCopy.greeting}</Text>
            <Text style={local.heroTitle}>Waste is not the end.</Text>
            <Text style={local.heroSub}>{roleCopy.sub}</Text>
          </View>
          <View style={local.liveOrb}><View style={local.liveOrbInner}><MaterialIcons name="autorenew" size={25} color={palette.ink} /></View><Text style={local.liveOrbLabel}>LIVE{`\n`}NETWORK</Text></View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={local.roleRail}>
          {roles.map((item) => (
            <Pressable key={item.label} onPress={() => { impact(); setRole(item.label); }} style={({ pressed }) => [local.roleChip, role === item.label && local.roleChipActive, pressed && ui.pressed]}>
              <MaterialIcons name={item.icon} size={15} color={role === item.label ? palette.ink : palette.muted} />
              <Text style={[local.roleChipText, role === item.label && local.roleChipTextActive]}>{item.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Card tone="mint" style={local.scoreCard}>
          <View style={local.scoreTop}>
            <View><Eyebrow color={palette.ink}>YOUR RECOVERY / 30 DAYS</Eyebrow><Text style={local.scoreValue}>12.8 <Text style={local.scoreUnit}>kg</Text></Text><Text style={local.scoreCaption}>recovered material</Text></View>
            <View style={local.scoreRing}><Text style={local.scoreRingValue}>94</Text><Text style={local.scoreRingLabel}>SCORE</Text></View>
          </View>
          <ProgressBar value={94} color={palette.ink} height={7} />
          <View style={local.scoreFoot}><Text style={local.scoreFootText}>↑ 18% from last month</Text><Text style={local.scoreFootText}>Verified recovery</Text></View>
        </Card>

        <View style={local.statGrid}>
          <Card style={local.statCard}><Stat value="23" label="successful deposits" accent={palette.mint} /><IconBadge name="check-circle" size={30} /></Card>
          <Card style={local.statCard}><Stat value="₹246" label="RE:MATTER credits" accent={palette.amber} /><IconBadge name="account-balance-wallet" color={palette.amber} background="rgba(255,203,112,0.13)" size={30} /></Card>
        </View>

        <View style={local.actionRow}>
          <PrimaryButton label="Deposit material" onPress={() => setDepositOpen(true)} icon="add-circle-outline" />
          <Pressable onPress={runDemo} style={({ pressed }) => [local.demoButton, pressed && ui.buttonPressed]}><MaterialIcons name="play-circle-outline" size={23} color={palette.mint} /><Text style={local.demoText}>RUN LIVE{`\n`}DEMO</Text></Pressable>
        </View>

        <SectionTitle title="Smart Pod status" action="View pod" onAction={() => router.push("/pod")} />
        <Card style={local.podCard}>
          <View style={local.podHeader}><View style={local.podName}><IconBadge name="sensors" color={palette.teal} background="rgba(103,216,186,0.12)" /><View><Text style={local.cardTitle}>RM-POD-0021</Text><View style={local.inline}><View style={local.greenDot} /><Text style={local.mutedSmall}>CONNECTED · 2 min ago</Text></View></View></View><Pill label="Healthy" color={palette.mint} /></View>
          <View style={local.podMeter}><View style={local.podMeterText}><Text style={local.podFillValue}>82%</Text><Text style={local.mutedSmall}>fill level</Text></View><View style={local.meterCircle}><View style={local.meterArc}><Text style={local.meterArcText}>82</Text></View></View></View>
          <View style={local.sensorGrid}><View><Text style={local.sensorLabel}>WEIGHT</Text><Text style={local.sensorValue}>18.4 kg</Text></View><View><Text style={local.sensorLabel}>TEMP</Text><Text style={local.sensorValue}>24.6 °C</Text></View><View><Text style={local.sensorLabel}>HUMIDITY</Text><Text style={local.sensorValue}>58%</Text></View><View><Text style={local.sensorLabel}>BATTERY</Text><Text style={local.sensorValue}>91%</Text></View></View>
          <View style={local.alertStrip}><MaterialIcons name="auto-awesome" size={16} color={palette.mint} /><Text style={local.alertText}>Automatic pickup threshold at 85% · ~4 hours</Text></View>
        </Card>

        <SectionTitle title="Recovery flow" action="Open passport" onAction={() => router.push("/passport")} />
        <Card style={local.flowCard}>
          <Text style={local.flowStatement}>From separated stream to verified industrial feedstock.</Text>
          <View style={local.flowLine}>{["CAPTURE", "COLLECT", "PROCESS", "VERIFY", "NEXT USE"].map((step, index) => <View key={step} style={local.flowStep}><View style={[local.flowDot, index < 3 && local.flowDotActive]}><Text style={local.flowDotText}>{index + 1}</Text></View><Text style={[local.flowLabel, index < 3 && local.flowLabelActive]}>{step}</Text>{index < 4 ? <View style={local.flowConnector} /> : null}</View>)}</View>
          <View style={local.flowFooter}><Text style={local.mutedSmall}>Latest batch</Text><Text style={local.batchId}>RM-CIT-2026-000481</Text><Pill label="Quality pending" color={palette.amber} background="rgba(255,203,112,0.12)" /></View>
        </Card>

        <SectionTitle title="Matter AI signal" action="Explore intelligence" onAction={() => router.push("/intelligence")} />
        <Card tone="blue" style={local.aiCard}>
          <View style={local.aiTop}><View><Eyebrow color={palette.blue}>SIMULATED PREDICTION</Eyebrow><Text style={local.aiTitle}>Citrus feedstock demand is projected to increase over the next 30 days.</Text></View><IconBadge name="insights" color={palette.blue} background="rgba(120,184,255,0.13)" /></View>
          <MiniBar label="Citrus" value={84} max={100} color={palette.mint} suffix=" / high" /><MiniBar label="Used oil" value={62} max={100} color={palette.amber} suffix=" / medium" /><MiniBar label="Coffee" value={38} max={100} color={palette.blue} suffix=" / low" />
          <Text style={local.disclaimer}>Demo signal · not connected to live market data</Text>
        </Card>

        <Card style={local.mantraCard}><Text style={local.mantra}>“We don’t collect waste. We connect materials with their next use.”</Text><Text style={local.mantraBy}>— RE:MATTER network principle</Text></Card>

        <View style={local.bottomLinks}><Pressable onPress={() => setPitchOpen(true)} style={local.bottomLink}><MaterialIcons name="mic-none" size={15} color={palette.mint} /><Text style={local.bottomLinkText}>PITCH MODE</Text></Pressable><Pressable onPress={() => router.push("/(tabs)/network")} style={local.bottomLink}><MaterialIcons name="public" size={15} color={palette.mint} /><Text style={local.bottomLinkText}>NATIONAL SCALE</Text></Pressable></View>
      </ScrollView>

      <Modal visible={depositOpen} transparent animationType="slide" onRequestClose={closeDeposit}>
        <View style={local.modalBackdrop}><View style={local.sheet}>
          <View style={local.sheetHandle} />
          {!depositComplete ? <>
            <View style={local.sheetHeader}><View><Eyebrow>NEW DEPOSIT / STEP 1 OF 3</Eyebrow><Text style={local.sheetTitle}>Capture a material stream</Text></View><Pressable onPress={closeDeposit} style={local.closeButton}><MaterialIcons name="close" size={20} color={palette.muted} /></Pressable></View>
            <Text style={local.mutedText}>Choose the cleanest separated stream. AI classification is an estimate until verified by testing.</Text>
            <View style={local.depositGrid}>{depositOptions.map((option) => <Pressable key={option.label} onPress={() => setSelectedMaterial(option.label)} style={[local.depositOption, selectedMaterial === option.label && local.depositOptionActive]}><Text style={local.depositEmoji}>{option.icon}</Text><Text style={local.depositOptionLabel}>{option.label}</Text><Text style={local.depositOptionDetail}>{option.detail}</Text></Pressable>)}</View>
            <Text style={local.inputLabel}>MEASURED WEIGHT (KG)</Text><TextInput value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="e.g. 1.8" placeholderTextColor={palette.muted} style={local.input} />
            <Card tone="mint" style={local.aiCheck}><View style={local.aiCheckRow}><IconBadge name="auto-awesome" color={palette.ink} background="rgba(7,26,36,0.12)" size={34} /><View style={{ flex: 1 }}><Text style={local.aiCheckTitle}>Matter AI quality check</Text><Text style={local.aiCheckText}>Detected: {selectedMaterial === "Citrus peel" ? "Citrus biomass" : selectedMaterial}. Risk: Low · Grade: A (estimated)</Text></View></View></Card>
            <PrimaryButton label="Review deposit" onPress={() => setDepositComplete(true)} icon="arrow-forward" />
          </> : <>
            <View style={local.successIcon}><MaterialIcons name="check" size={30} color={palette.ink} /></View><Eyebrow color={palette.mint}>DEPOSIT VERIFIED / DEMO</Eyebrow><Text style={local.sheetTitle}>Your material has a next use.</Text><Text style={local.mutedText}>{weight || "1.8"} kg of {selectedMaterial.toLowerCase()} is queued for pickup. Estimated credit: <Text style={local.mintText}>₹{estimateDepositCredit(Number(weight || 1.8))}</Text>.</Text>
            <Card style={local.pickupCard}><View style={local.pickupRow}><Text style={local.mutedSmall}>PICKUP REQUEST</Text><Pill label="Created" /></View><Text style={local.pickupId}>RM-PU-0481</Text><View style={local.pickupDetails}><Text style={local.mutedSmall}>Estimated window</Text><Text style={local.bodyStrong}>Today · 18:30–19:00</Text></View><View style={local.pickupDetails}><Text style={local.mutedSmall}>Assigned partner</Text><Text style={local.bodyStrong}>Aarav Logistics</Text></View></Card>
            <PrimaryButton label="Done" onPress={closeDeposit} icon="done" />
          </>}
        </View></View>
      </Modal>

      <Modal visible={demoOpen} transparent animationType="fade" onRequestClose={() => setDemoOpen(false)}>
        <View style={local.modalBackdrop}><View style={local.demoModal}><View style={local.sheetHeader}><View><Eyebrow>INTERACTIVE DEMO / {demoSteps[demoStep][0]}</Eyebrow><Text style={local.sheetTitle}>The RE:MATTER loop</Text></View><Pressable onPress={() => setDemoOpen(false)} style={local.closeButton}><MaterialIcons name="close" size={20} color={palette.muted} /></Pressable></View><View style={local.demoVisual}><View style={local.demoOrbit} /><IconBadge name={demoStep < 2 ? "sensors" : demoStep < 4 ? "inventory-2" : "shopping-bag"} color={palette.ink} background={palette.mint} size={66} /><Text style={local.demoVisualLabel}>{demoStep < 2 ? "SMART POD" : demoStep < 4 ? "MATERIAL HUB" : "NEXT USE"}</Text></View><Text style={local.demoStepTitle}>{demoSteps[demoStep][1]}</Text><Text style={local.mutedText}>{demoSteps[demoStep][2]}</Text><View style={local.demoProgress}>{demoSteps.map((item, index) => <View key={item[0]} style={[local.demoProgressDot, index <= demoStep && local.demoProgressDotActive]} />)}</View><PrimaryButton label={demoStep === demoSteps.length - 1 ? "Replay story" : "Next moment"} onPress={() => setDemoStep(demoStep === demoSteps.length - 1 ? 0 : demoStep + 1)} icon={demoStep === demoSteps.length - 1 ? "replay" : "arrow-forward"} /></View></View>
      </Modal>

      <Modal visible={pitchOpen} transparent animationType="slide" onRequestClose={() => setPitchOpen(false)}>
        <View style={local.modalBackdrop}><View style={local.pitchModal}><View style={local.sheetHeader}><View><Eyebrow>5-MINUTE PITCH MODE</Eyebrow><Text style={local.sheetTitle}>The infrastructure of next use.</Text></View><Pressable onPress={() => setPitchOpen(false)} style={local.closeButton}><MaterialIcons name="close" size={20} color={palette.muted} /></Pressable></View><Text style={local.pitchNumber}>01 / 05</Text><Text style={local.pitchHeadline}>Useful material is lost at the point of disposal.</Text><Text style={local.mutedText}>RE:MATTER captures, tracks, aggregates, processes, verifies, and connects discarded materials with industrial demand — across a national network.</Text><View style={local.pitchSteps}><Text style={local.pitchStepActive}>PROBLEM</Text><Text>SOLUTION</Text><Text>HOW IT WORKS</Text><Text>BUSINESS MODEL</Text><Text>SCALE / IMPACT</Text></View><PrimaryButton label="Enter dashboard" onPress={() => setPitchOpen(false)} icon="arrow-forward" /></View></View>
      </Modal>
    </ScreenContainer>
  );
}

const local = StyleSheet.create({
  content: { padding: 20, paddingBottom: 42, gap: 16 },
  topbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  brandLockup: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandMark: { width: 36, height: 36, borderRadius: 13, backgroundColor: palette.mint, alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: palette.ink, fontSize: 21, fontWeight: "900" },
  brand: { color: palette.text, fontSize: 13, fontWeight: "900", letterSpacing: 2.2 },
  brandSub: { color: palette.muted, fontSize: 8, fontWeight: "800", letterSpacing: 1.4, marginTop: 2 },
  avatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: palette.line, alignItems: "center", justifyContent: "center", backgroundColor: palette.surface2 },
  avatarText: { color: palette.mint, fontWeight: "900" },
  heroRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  heroCopy: { flex: 1, paddingRight: 12 },
  heroKicker: { color: palette.muted, fontSize: 13, fontWeight: "700", marginBottom: 7 },
  heroTitle: { color: palette.text, fontSize: 31, lineHeight: 35, fontWeight: "900", letterSpacing: -1.2 },
  heroSub: { color: palette.teal, fontSize: 14, lineHeight: 20, marginTop: 8, maxWidth: 260 },
  liveOrb: { width: 78, height: 78, borderRadius: 39, backgroundColor: "rgba(199,243,107,0.1)", borderWidth: 1, borderColor: "rgba(199,243,107,0.35)", alignItems: "center", justifyContent: "center", gap: 2 },
  liveOrbInner: { width: 34, height: 34, borderRadius: 17, backgroundColor: palette.mint, alignItems: "center", justifyContent: "center" },
  liveOrbLabel: { color: palette.mint, fontSize: 7, fontWeight: "900", letterSpacing: 1.1, textAlign: "center", lineHeight: 9 },
  roleRail: { gap: 8, paddingVertical: 5 },
  roleChip: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: palette.line, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 9, backgroundColor: "rgba(16,47,58,0.7)" },
  roleChipActive: { backgroundColor: palette.mint, borderColor: palette.mint },
  roleChipText: { color: palette.muted, fontSize: 11, fontWeight: "800" },
  roleChipTextActive: { color: palette.ink },
  scoreCard: { marginTop: 2, padding: 20 },
  scoreTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  scoreValue: { color: palette.ink, fontSize: 42, lineHeight: 45, fontWeight: "900", letterSpacing: -2 },
  scoreUnit: { fontSize: 19, letterSpacing: 0 },
  scoreCaption: { color: "rgba(7,26,36,0.62)", fontSize: 12, fontWeight: "700" },
  scoreRing: { width: 70, height: 70, borderRadius: 35, borderWidth: 5, borderColor: palette.ink, alignItems: "center", justifyContent: "center" },
  scoreRingValue: { color: palette.ink, fontSize: 22, fontWeight: "900" },
  scoreRingLabel: { color: "rgba(7,26,36,0.7)", fontSize: 8, fontWeight: "900", letterSpacing: 1 },
  scoreFoot: { flexDirection: "row", justifyContent: "space-between", marginTop: 11 },
  scoreFootText: { color: "rgba(7,26,36,0.72)", fontSize: 11, fontWeight: "800" },
  statGrid: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, minHeight: 105, padding: 15, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  actionRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  demoButton: { width: 96, minHeight: 52, borderRadius: 16, backgroundColor: "rgba(103,216,186,0.1)", borderWidth: 1, borderColor: "rgba(103,216,186,0.26)", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 },
  demoText: { color: palette.mint, fontSize: 9, fontWeight: "900", letterSpacing: 1, lineHeight: 12 },
  podCard: { gap: 15 },
  podHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  podName: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardTitle: { color: palette.text, fontSize: 15, fontWeight: "900" },
  inline: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 3 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.mint },
  mutedSmall: { color: palette.muted, fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
  podMeter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 3 },
  podMeterText: { gap: 2 },
  podFillValue: { color: palette.text, fontSize: 33, fontWeight: "900", letterSpacing: -1 },
  meterCircle: { width: 78, height: 78, borderRadius: 39, borderWidth: 8, borderColor: "rgba(103,216,186,0.14)", borderTopColor: palette.teal, borderRightColor: palette.mint, alignItems: "center", justifyContent: "center" },
  meterArc: { width: 58, height: 58, borderRadius: 29, backgroundColor: "rgba(103,216,186,0.08)", alignItems: "center", justifyContent: "center" },
  meterArcText: { color: palette.teal, fontSize: 19, fontWeight: "900" },
  sensorGrid: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: palette.line, paddingTop: 14 },
  sensorLabel: { color: palette.muted, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  sensorValue: { color: palette.text, fontSize: 13, fontWeight: "800", marginTop: 5 },
  alertStrip: { flexDirection: "row", alignItems: "center", gap: 7, padding: 10, borderRadius: 11, backgroundColor: "rgba(199,243,107,0.08)" },
  alertText: { color: palette.mint, fontSize: 11, fontWeight: "700", flex: 1 },
  flowCard: { gap: 14 },
  flowStatement: { color: palette.text, fontSize: 15, lineHeight: 21, fontWeight: "700" },
  flowLine: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingTop: 6 },
  flowStep: { alignItems: "center", flex: 1, position: "relative" },
  flowDot: { width: 27, height: 27, borderRadius: 14, backgroundColor: palette.surface2, borderWidth: 1, borderColor: palette.line, alignItems: "center", justifyContent: "center", zIndex: 1 },
  flowDotActive: { backgroundColor: palette.mint, borderColor: palette.mint },
  flowDotText: { color: palette.ink, fontSize: 10, fontWeight: "900" },
  flowLabel: { color: palette.muted, fontSize: 7, fontWeight: "900", letterSpacing: 0.6, marginTop: 7, textAlign: "center" },
  flowLabelActive: { color: palette.mint },
  flowConnector: { position: "absolute", top: 13, left: "60%", right: "-40%", height: 1, backgroundColor: palette.line },
  flowFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: palette.line, paddingTop: 12 },
  batchId: { color: palette.text, fontSize: 10, fontWeight: "900", letterSpacing: 0.2 },
  aiCard: { gap: 2 },
  aiTop: { flexDirection: "row", gap: 12, marginBottom: 15 },
  aiTitle: { color: palette.text, fontSize: 15, lineHeight: 21, fontWeight: "800", marginTop: 7, flex: 1 },
  disclaimer: { color: palette.muted, fontSize: 10, fontStyle: "italic", marginTop: 3 },
  mantraCard: { padding: 22, backgroundColor: "#0C2028", borderColor: "rgba(199,243,107,0.2)" },
  mantra: { color: palette.mintSoft, fontSize: 19, lineHeight: 27, fontWeight: "800", letterSpacing: -0.4 },
  mantraBy: { color: palette.muted, fontSize: 11, marginTop: 12, fontWeight: "700" },
  bottomLinks: { flexDirection: "row", justifyContent: "center", gap: 22, paddingVertical: 4 },
  bottomLink: { flexDirection: "row", alignItems: "center", gap: 6, padding: 8 },
  bottomLinkText: { color: palette.mint, fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(2,10,14,0.72)", justifyContent: "flex-end" },
  sheet: { backgroundColor: palette.inkSoft, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 30, gap: 16, borderWidth: 1, borderColor: palette.line },
  sheetHandle: { alignSelf: "center", width: 44, height: 4, borderRadius: 2, backgroundColor: palette.line, marginBottom: 1 },
  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  sheetTitle: { color: palette.text, fontSize: 25, lineHeight: 29, fontWeight: "900", letterSpacing: -0.7, marginTop: 5, maxWidth: 300 },
  closeButton: { padding: 6, marginTop: -5 },
  mutedText: { color: palette.muted, fontSize: 13, lineHeight: 20 },
  depositGrid: { flexDirection: "row", gap: 9 },
  depositOption: { flex: 1, minHeight: 90, borderRadius: 15, padding: 10, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line },
  depositOptionActive: { backgroundColor: "#183A32", borderColor: palette.mint },
  depositEmoji: { fontSize: 23, marginBottom: 7 },
  depositOptionLabel: { color: palette.text, fontSize: 11, fontWeight: "800" },
  depositOptionDetail: { color: palette.muted, fontSize: 9, marginTop: 3 },
  inputLabel: { color: palette.muted, fontSize: 10, fontWeight: "900", letterSpacing: 1, marginTop: 1 },
  input: { minHeight: 50, borderRadius: 14, borderWidth: 1, borderColor: palette.line, color: palette.text, paddingHorizontal: 15, fontSize: 17, fontWeight: "800", backgroundColor: palette.surface },
  aiCheck: { padding: 13, borderRadius: 16 },
  aiCheckRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  aiCheckTitle: { color: palette.ink, fontSize: 13, fontWeight: "900" },
  aiCheckText: { color: "rgba(7,26,36,0.7)", fontSize: 11, lineHeight: 15, marginTop: 3 },
  successIcon: { width: 62, height: 62, borderRadius: 31, backgroundColor: palette.mint, alignItems: "center", justifyContent: "center", marginBottom: 2 },
  mintText: { color: palette.mint, fontWeight: "900" },
  pickupCard: { gap: 9, backgroundColor: palette.surface, borderRadius: 18, borderWidth: 1, borderColor: palette.line, padding: 15 },
  pickupRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pickupId: { color: palette.text, fontSize: 21, fontWeight: "900", letterSpacing: -0.5 },
  pickupDetails: { borderTopWidth: 1, borderTopColor: palette.line, paddingTop: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  bodyStrong: { color: palette.text, fontSize: 13, fontWeight: "800" },
  demoModal: { backgroundColor: palette.inkSoft, borderRadius: 28, padding: 22, margin: 18, gap: 15, borderWidth: 1, borderColor: palette.line },
  demoVisual: { alignItems: "center", justifyContent: "center", height: 150, borderRadius: 20, backgroundColor: "#0A2028", borderWidth: 1, borderColor: "rgba(103,216,186,0.18)", gap: 9, overflow: "hidden" },
  demoOrbit: { position: "absolute", width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: "rgba(199,243,107,0.19)" },
  demoVisualLabel: { color: palette.mint, fontSize: 10, fontWeight: "900", letterSpacing: 1.6 },
  demoStepTitle: { color: palette.text, fontSize: 22, fontWeight: "900", letterSpacing: -0.4 },
  demoProgress: { flexDirection: "row", gap: 6 },
  demoProgressDot: { height: 4, flex: 1, backgroundColor: palette.line, borderRadius: 3 },
  demoProgressDotActive: { backgroundColor: palette.mint },
  pitchModal: { backgroundColor: palette.inkSoft, borderRadius: 28, padding: 22, margin: 18, gap: 16, borderWidth: 1, borderColor: palette.line },
  pitchNumber: { color: palette.mint, fontSize: 12, fontWeight: "900", letterSpacing: 1.5 },
  pitchHeadline: { color: palette.text, fontSize: 29, lineHeight: 34, fontWeight: "900", letterSpacing: -1 },
  pitchSteps: { gap: 11, borderLeftWidth: 1, borderLeftColor: palette.line, paddingLeft: 14 },
  pitchStepActive: { color: palette.mint, fontSize: 11, fontWeight: "900", letterSpacing: 1 },
});
