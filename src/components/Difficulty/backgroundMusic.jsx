export default function BackgroundMusic({Ref, audioUrl}) {
  return (
    <audio
      id="opening-music"
      src={audioUrl}
      loop
      type="audio/mpeg"
      ref={Ref}
    />
  );
}