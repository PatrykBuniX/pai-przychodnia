export type InferPagePropsType<T> = T extends (
  ...args: readonly any[]
) => Promise<
  | { readonly props: infer P }
  | { readonly notFound: boolean }
  | {
      redirect: {
        permanent: boolean;
        destination: string;
      };
    }
>
  ? NonNullable<P>
  : never;
