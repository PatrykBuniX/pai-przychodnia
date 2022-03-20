interface CookieBarProps {
  hideCookiesBar: () => void;
}

export const CookieBar = ({ hideCookiesBar }: CookieBarProps) => {
  return (
    <section className="fixed bg-white shadow-md m-5 rounded p-5 0 left-0 bottom-0 border-2 border-blue-600 max-w-lg">
      <h2 className="font-bold text-lg border-b-2 border-blue-600 w-fit">
        Uwaga!
      </h2>
      <span className="absolute -right-6 -top-6 text-6xl animate-bounce">
        🍪
      </span>
      <p className="text-sm mt-3">
        Strona używa ciasteczek!
        <br />
        (Przechowywanie informacji o sesji zalogowanego użytkownika)
      </p>
      <button
        onClick={hideCookiesBar}
        className="mt-5 block py-2 px-4 bg-blue-600 ml-auto text-white rounded-md shadow-sm hover:bg-blue-500"
      >
        OK
      </button>
    </section>
  );
};
