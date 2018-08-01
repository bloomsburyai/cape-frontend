from cape_frontend.webapp import webapp_core

if __name__ == '__main__':
    import sys

    port = int(sys.argv[1]) if len(sys.argv) == 2 else None
    webapp_core.run(port=port)
