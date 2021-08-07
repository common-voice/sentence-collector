const truthyFilter = <T>(x: T | false | undefined | '' | 0): x is T => !!x;

export default truthyFilter;
