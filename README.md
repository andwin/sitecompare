#Sitecompare

This is a tool to compare two versions of a website making sure they are exactly the same.

When is this useful? For example after upgrading versions of the underlying components or after refactoring the code. After any change that shouldn’t affect the output.

If your site has a lot of pages it could be quite tedious and time consuming to compare the output manually.

You could for example deploy the new version to your staging server, synchronize the databases and then use this tool to make sure the output is the same.

But some of the code on the staging server will always be different. For example timestamps or version numbers on css includes, base urls for images and so on. Can I still use this? Yes! You can supply a list of regular expressions of content to remove from both versions before comparing the result.

## Configuration
Here is a sample config file. Specify the base url for the expected version (for example your production site) and your actual version (for example your staging server), lists of regular expressions for content to remove and finally a list of paths to compare from the two website versions.

```yaml
Expected:
  BaseUrl: http://www.example.com
  RemoveContent:
    - <script src="/assets/vendor.js?(.*)">
    - https://img.example.com
Actual:
  BaseUrl: http://staging.example.com
  RemoveContent:
    - <script src="/assets/vendor.js?(.*)">
    - https://img-staging.example.com
Paths:
  - /
  - /about
  - /search?q=hello
```

## Usage

```siitecompare <config file>```

for example

```sitecompare config.yaml```
