// The water, as CSS layers only: a night sea and a day sea, one shown per theme
// (`light:` / `light:hidden`), so the right one is on screen from first paint with
// no flash while React hydrates. Shared by the page background (SceneBackground)
// and the splash screen, so both read as the same sea at the same time of day.
//
// Layers are `absolute inset-0`: place it inside any positioned container.

export function SeaWater() {
  return (
    <>
      {/* ------------------------------ NIGHT --------------------------------- */}

      {/* Night water: a deep navy that darkens toward the bottom. The last stop is
          --background, so the fade at the bottom is seamless. */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #0b2142 0%, #08182e 40%, #061220 75%, #050f1d 100%)",
        }}
      />

      {/* Bioluminescent haze: a faint teal glow pooling low in the water. */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "radial-gradient(70% 45% at 20% 108%, rgba(45,212,191,0.16), rgba(45,212,191,0) 70%), radial-gradient(60% 40% at 88% 100%, rgba(56,189,248,0.10), rgba(56,189,248,0) 70%)",
        }}
      />

      {/* The moon, seen through the surface: a cool glare and a soft pale disc,
          up in the top-left (the sun is on the right by day). */}
      <div
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "radial-gradient(50% 40% at 16% -10%, rgba(170,200,255,0.42), rgba(170,200,255,0) 72%), radial-gradient(70px 70px at 17% 3%, rgba(236,243,255,0.55), rgba(236,243,255,0) 100%)",
          animation: "moon-glow 10s ease-in-out infinite",
        }}
      />

      {/* Moonbeams: faint cool shafts slanting down, drifting slowly. CSS-animated, so
          the water keeps moving even where the JS render loop is throttled. */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen light:hidden [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
        style={{
          background: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 70px,
            rgba(150,185,255,0.085) 105px,
            transparent 150px,
            transparent 230px
          )`,
          animation: "caustics-drift 18s ease-in-out infinite",
        }}
      />

      {/* ------------------------------- DAY ---------------------------------- */}

      {/* Clear shallow water: bright at the surface, a little deeper below. The
          last stop is --background, so the fade at the bottom is seamless. */}
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          background:
            "linear-gradient(to bottom, #e6f8fc 0%, #bfe9f3 20%, #9fdcec 55%, #86cfe3 100%)",
        }}
      />

      {/* The sun, just above the frame: a warm glare spilling down into the water. */}
      <div
        className="absolute inset-0 hidden light:block"
        style={{
          background:
            "radial-gradient(55% 42% at 80% -10%, rgba(255,246,208,0.95), rgba(255,246,208,0) 72%), radial-gradient(90% 26% at 50% 0%, rgba(255,255,255,0.7), rgba(255,255,255,0) 100%)",
          animation: "sun-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Sunbeams through the surface: soft white shafts that drift and fade with depth. */}
      <div
        className="absolute inset-0 hidden opacity-80 light:block [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          background: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 70px,
            rgba(255,255,255,0.34) 105px,
            transparent 150px,
            transparent 230px
          )`,
          animation: "caustics-drift 16s ease-in-out infinite",
        }}
      />
    </>
  );
}
